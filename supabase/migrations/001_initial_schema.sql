-- Chat history
CREATE TABLE IF NOT EXISTS chat_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  mode TEXT DEFAULT 'chat',
  tech_topic TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Learning progress (single row, single user)
CREATE TABLE IF NOT EXISTS progress (
  id INTEGER PRIMARY KEY DEFAULT 1,
  words_learned INTEGER DEFAULT 0,
  mistakes_corrected INTEGER DEFAULT 0,
  streak_days INTEGER DEFAULT 0,
  points INTEGER DEFAULT 0,
  last_active DATE DEFAULT CURRENT_DATE
);

-- Learned words tracking
CREATE TABLE IF NOT EXISTS learned_words (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  word TEXT NOT NULL UNIQUE,
  meaning_telugu TEXT,
  learned_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tech learning progress per topic
CREATE TABLE IF NOT EXISTS tech_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  topic TEXT NOT NULL UNIQUE,
  lessons_completed INTEGER DEFAULT 0,
  quizzes_passed INTEGER DEFAULT 0,
  current_level TEXT DEFAULT 'beginner',
  last_studied TIMESTAMPTZ DEFAULT NOW()
);

-- Seed initial progress row
INSERT INTO progress (id, words_learned, mistakes_corrected, streak_days, points, last_active)
VALUES (1, 0, 0, 0, 0, CURRENT_DATE)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS but allow all access (no auth, single user)
ALTER TABLE chat_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE learned_words ENABLE ROW LEVEL SECURITY;
ALTER TABLE tech_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all on chat_history" ON chat_history FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on progress" ON progress FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on learned_words" ON learned_words FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on tech_progress" ON tech_progress FOR ALL USING (true) WITH CHECK (true);
