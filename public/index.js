const btn = document.querySelector('.btn');
const form = document.getElementById('chatForm');
const inp = document.getElementById('input');
const messagesEl = document.getElementById('messages');
const errorEl = document.getElementById('error');
const typingEl = document.getElementById('typingIndicator');

const BASE_URL = 'https://gemoai.vercel.app';
// const BASE_URL = 'http://localhost:3000';
let loading = false;

function formatTime(date = new Date()) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function appendMessage({ from, text }) {
  const row = document.createElement('div');
  row.className = `message-row ${from}`;

  const avatar = document.createElement('div');
  avatar.className = 'avatar';
  avatar.textContent = from === 'user' ? 'You' : 'G';

  const bubble = document.createElement('div');
  bubble.className = 'bubble';

  const meta = document.createElement('div');
  meta.className = 'meta';

  const name = document.createElement('span');
  name.className = 'name';
  name.textContent = from === 'user' ? 'You' : 'Gemo';

  const time = document.createElement('span');
  time.className = 'time';
  time.textContent = formatTime();

  const body = document.createElement('p');
  body.className = 'text';
  body.textContent = text;

  meta.appendChild(name);
  meta.appendChild(time);
  bubble.appendChild(meta);
  bubble.appendChild(body);
  row.appendChild(avatar);
  row.appendChild(bubble);

  messagesEl.appendChild(row);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

const genAI = async (prompt) => {

  try {
    loading = true;
    typingEl.style.display = 'flex';
    btn.disabled = true;

    const response = await axios.post(
      `${BASE_URL}/api/v2/ai/generate`,
      { prompt },
      { responseType: 'text' }
    );

    return response.data;
  } catch (error) {
    console.log(error?.response?.data || error?.message);
    throw error;
  } finally {
    loading = false;
    typingEl.style.display = 'none';
    btn.disabled = false;
  }
};

const handleSubmit = async (event) => {
  event.preventDefault();

  if (loading) return;

  const prompt = inp.value.trim();
  if (!prompt) {
    errorEl.style.display = 'block';
    return;
  }

  errorEl.style.display = 'none';

  appendMessage({ from: 'user', text: prompt });

  inp.value = '';

  try {
    const text = await genAI(prompt);
    if (text != null) {
      appendMessage({ from: 'ai', text });
    }
  } catch (e) {
    appendMessage({
      from: 'ai',
      text: 'Something went wrong. Please try again in a moment.',
    });
  }
};

form.addEventListener('submit', handleSubmit);
btn.addEventListener('click', handleSubmit);
