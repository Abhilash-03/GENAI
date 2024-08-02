const btn = document.querySelector('.btn');
const inp = document.getElementById('input');
const question = document.querySelector('.question');
const answer = document.querySelector('.answer');
const error = document.querySelector('.error');

const URL = 'https://gemoai.vercel.app';
let loading = true;

const genAI = async() => {
    question.innerText = inp.value;
  try {
    loading = true;
    const {data} = await axios.post(`${URL}/api/v1/ai/generate`, { prompt: inp.value.trim() });
    return data;
  } catch (error) {
    console.log(error?.response?.data);
  } finally{
    loading = false;
  }

}

btn.addEventListener('click', async() => {
    if(inp.value === '' || inp.value.trim() === ''){
        error.style.display = 'block';
         question.innerText = '';
         answer.innerText = ''
        return;
    }
    error.style.display = 'none';
    answer.innerText = 'Generating....';
    const data = await genAI();
    answer.innerText = data;
    inp.value = '';
  })
