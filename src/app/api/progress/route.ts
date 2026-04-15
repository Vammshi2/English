import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data: progress, error: progressError } = await supabase
      .from('progress')
      .select('*')
      .eq('id', 1)
      .single();

    if (progressError && progressError.code !== 'PGRST116') {
      throw progressError;
    }

    const { data: techProgress, error: techError } = await supabase
      .from('tech_progress')
      .select('*')
      .order('last_studied', { ascending: false });

    if (techError && techError.code !== 'PGRST116') {
      throw techError;
    }

    const { count: wordsCount } = await supabase
      .from('learned_words')
      .select('*', { count: 'exact', head: true });

    return NextResponse.json({
      progress: progress || {
        words_learned: 0,
        mistakes_corrected: 0,
        streak_days: 0,
        points: 0,
        last_active: new Date().toISOString().split('T')[0],
      },
      techProgress: techProgress || [],
      totalWords: wordsCount || 0,
    });
  } catch (error) {
    console.error('Progress API error:', error);
    return NextResponse.json({ error: 'Failed to fetch progress' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, data } = body;

    switch (action) {
      case 'increment_points': {
        const { data: current } = await supabase
          .from('progress')
          .select('points, last_active, streak_days')
          .eq('id', 1)
          .single();

        const today = new Date().toISOString().split('T')[0];
        const lastActive = current?.last_active;
        let streakDays = current?.streak_days || 0;

        if (lastActive !== today) {
          const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
          streakDays = lastActive === yesterday ? streakDays + 1 : 1;
        }

        const { error } = await supabase
          .from('progress')
          .upsert({
            id: 1,
            points: (current?.points || 0) + (data?.points || 1),
            streak_days: streakDays,
            last_active: today,
          });

        if (error) throw error;
        return NextResponse.json({ success: true });
      }

      case 'increment_mistakes': {
        const { data: current } = await supabase
          .from('progress')
          .select('mistakes_corrected')
          .eq('id', 1)
          .single();

        const { error } = await supabase
          .from('progress')
          .update({ mistakes_corrected: (current?.mistakes_corrected || 0) + 1 })
          .eq('id', 1);

        if (error) throw error;
        return NextResponse.json({ success: true });
      }

      case 'add_word': {
        const { word, meaning_telugu } = data;
        const { error } = await supabase
          .from('learned_words')
          .upsert({ word, meaning_telugu }, { onConflict: 'word' });

        if (!error) {
          const { data: current } = await supabase
            .from('progress')
            .select('words_learned')
            .eq('id', 1)
            .single();

          await supabase
            .from('progress')
            .update({ words_learned: (current?.words_learned || 0) + 1 })
            .eq('id', 1);
        }
        return NextResponse.json({ success: true });
      }

      case 'update_tech_progress': {
        const { topic, lessonsCompleted, quizzesPassed, currentLevel } = data;
        const { error } = await supabase
          .from('tech_progress')
          .upsert(
            {
              topic,
              lessons_completed: lessonsCompleted,
              quizzes_passed: quizzesPassed,
              current_level: currentLevel,
              last_studied: new Date().toISOString(),
            },
            { onConflict: 'topic' }
          );

        if (error) throw error;
        return NextResponse.json({ success: true });
      }

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Progress POST error:', error);
    return NextResponse.json({ error: 'Failed to update progress' }, { status: 500 });
  }
}
