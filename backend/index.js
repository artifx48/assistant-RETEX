const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

app.post('/submit', async (req, res) => {
  const data = req.body;
  const { error } = await supabase.from('situations').insert([data]);

  if (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Erreur lors de l\'enregistrement.' });
  }

  res.status(200).json({ success: true });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend lancé sur http://localhost:${PORT}`));
