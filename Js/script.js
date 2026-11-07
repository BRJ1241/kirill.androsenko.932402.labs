const userName = prompt('Как вас зовут?');
alert(`Привет, ${userName}! Сейчас определим эффективность твоей подготовки.`);
console.log(`Пользователь: ${userName}`);
const wordsPerDay = [12, 55, 8, 70, 34, 95, 5];
console.log('Количество слов по дням:', wordsPerDay);
function findMax(arr)
{
    let max = arr[0];
    for (let i = 1; i < arr.length; i++)
    {
        if (arr[i] > max)
        {
            max = arr[i];
        }
    }
    return max;
}
function filter(arr,usl)
{
    const result = [];
    for (let i = 0; i < arr.length; i++)
    {
        if (usl(arr[i]))
        {
            result.push(arr[i]);
        }
    }
    return result;
}
function sum(arr)
{
    let total = 0;
    for (let i = 0; i < arr.length; i++)
    {
        total += arr[i];
    }
    return total;
}
function LowDays(arr, limit)
{
    let count = 0;
    for (let i = 0; i < arr.length; i++)
    {
        if (arr[i] <= limit)
        {
            count++;
            console.log(`В день ${i + 1} изучено ${arr[i]} слов - малый прогресс`);
        }
    }
    return count;
}
const HIGH = 50;
const LOW = 10;
const highDays = filter(wordsPerDay, (words) => words > HIGH);
console.log('Дни с высоким прогрессом (> 50 слов):', highDays);
const lowDays = LowDays(wordsPerDay, LOW);
const lowDaysPercent = (lowDays / wordsPerDay.length) * 100;
const totalWords = sum(wordsPerDay);
const maxWords = findMax(wordsPerDay);
const average = totalWords / wordsPerDay.length;
console.log('Максимум слов за день:', maxWords);
console.log('Среднее количество слов за день:', average.toFixed(1));
console.log(`Дней с малым прогрессом: ${lowDays} из ${wordsPerDay.length}`);
console.log(`Это ${lowDaysPercent.toFixed(1)}% от всех дней.`);
alert(`Всего выучено ${totalWords} слов, в ${highDays.length} днях прогресс был высоким.`);
if (average > 30)
{
    console.log('Отличный темп изучения языка!');
}
else
{
    console.log('Старайся учить больше слов в день.');
}


const Skills = document.getElementById('skills');
const Projects = document.getElementById('projects'); 
const BtnGe = document.querySelector('#btnGe');
const TS1 = document.querySelector('.theme-switch1');
const Li = document.querySelector('li');
const InputText = document.querySelector('input[type="text"]');
const allInputs = document.querySelectorAll('input');
console.log(Skills);
console.log(Projects); 
console.log(BtnGe);
console.log(TS1); 
console.log(Li);
console.log(InputText);
console.log(allInputs);


const THEME_KEY = 'lab3:theme';
const WORDS_KEY = 'lab3:words';
const HIDDEN_KEY = 'lab3:dictHidden';
function applyTheme(isDe)
{
    document.body.classList.toggle('theme-de', isDe);
}

const themeBtn = document.getElementById('themeBtn');

if (themeBtn)
{
    themeBtn.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('theme-de');
        themeBtn.textContent = isDark ? 'Светлая тема' : 'Тёмная тема';
        localStorage.setItem(THEME_KEY, isDark ? 'de' : 'ru');
    });
}

const savedTheme = localStorage.getItem(THEME_KEY);
const isDark = savedTheme === 'de';

document.body.classList.toggle('theme-de', isDark);          
if (themeBtn)
{
    themeBtn.textContent = isDark ? 'Светлая тема' : 'Тёмная тема';
}

const addForm = document.getElementById('addForm');
const wordInput = document.getElementById('wordInput');
const transInput = document.getElementById('transInput');
const dictBody = document.getElementById('dictBody');
const counter = document.getElementById('counter');
const emptyMsg = document.getElementById('emptyMsg');
const dictionary = document.querySelector('#dictionary');
const toggleBtn = document.getElementById('toggleBtn');
const clearBtn = document.getElementById('clearBtn');

function requireEl(el, name) {
    if (!el) {
        console.warn(`Не найден элемент: ${name}`);
        return false;
    }
    return true;
}

const dictReady = (
    requireEl(addForm, 'addForm') &&
    requireEl(wordInput, 'wordInput') &&
    requireEl(transInput, 'transInput') &&
    requireEl(dictBody, 'dictBody') &&
    requireEl(counter, 'counter') &&
    requireEl(dictionary, '#dictionary') &&
    requireEl(toggleBtn, 'toggleBtn') &&
    requireEl(clearBtn, 'clearBtn')
);
let words = []; 

function saveWords() {
    localStorage.setItem(WORDS_KEY, JSON.stringify(words));
}

function loadWords()
{
    try
    {
        const raw = localStorage.getItem(WORDS_KEY);
        const parsed = raw ? JSON.parse(raw) : [];
        if (!Array.isArray(parsed)) return [];
        return parsed.filter(w =>
            w && typeof w.id === 'string' &&
            typeof w.word === 'string' &&
            typeof w.translation === 'string'
        );
    } catch (err)
    {
        console.warn('Битые данные в localStorage:', err);
        return [];
    }
}

function render()
{
    if (!dictReady) return;
    dictBody.replaceChildren();
    words.forEach(item => {
        const tr = document.createElement('tr');
        tr.dataset.id = item.id;
        const tdWord = document.createElement('td');
        tdWord.textContent = item.word;
        const tdTrans = document.createElement('td');
        tdTrans.textContent = item.translation;
        const tdAction = document.createElement('td');
        const delBtn = document.createElement('button');
        delBtn.type = 'button';
        delBtn.dataset.action = 'remove';
        delBtn.textContent = 'Удалить';
        tdAction.append(delBtn);
        tr.append(tdWord, tdTrans, tdAction);
        dictBody.append(tr);
    });
    const rows = document.querySelectorAll('#dictBody tr');
    counter.textContent = `Всего слов: ${rows.length}`;
    emptyMsg.classList.toggle('hidden', rows.length > 0);
}
if (dictReady)
{
    addForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const word = wordInput.value.trim();
        const translation = transInput.value.trim();

        if (!word || !translation)
        {
            alert('Заполните оба поля');
            return;
        }
        const exists = words.some(w =>
            w.word.toLowerCase() === word.toLowerCase()
        );
        if (exists)
        {
            alert(`Слово «${word}» уже есть в словаре`);
            return;
        }
        words.push({
            id: Date.now().toString(),
            word,
            translation
        });
        saveWords();
        render();
        addForm.reset();
        wordInput.focus();
    });
    dictBody.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-action="remove"]');
        if (!btn) return;
        const tr = btn.closest('tr');
        const id = tr.dataset.id;
        words = words.filter(w => w.id !== id);
        saveWords();
        render();
    });
    clearBtn.addEventListener('click', () => {
        if (words.length === 0) return;
        if (!confirm('Удалить все слова?')) return;
        words = [];
        saveWords();
        render();
    });
    toggleBtn.addEventListener('click', () => {
        const isHidden = dictionary.classList.toggle('hidden');
        toggleBtn.textContent = isHidden ? 'Показать словарь' : 'Скрыть словарь';
        localStorage.setItem(HIDDEN_KEY, isHidden ? '1' : '0');
    });
}
if (dictReady)
{
    const hidden = localStorage.getItem(HIDDEN_KEY) === '1';
    dictionary.classList.toggle('hidden', hidden);
    toggleBtn.textContent = hidden ? 'Показать словарь' : 'Скрыть словарь';
    words = loadWords();
    render();
}