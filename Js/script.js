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




document.querySelector('.theme-switch1').addEventListener('click', () => {
    document.body.classList.add('theme-de');
});

document.querySelector('.theme-switch2').addEventListener('click', () => {
    document.body.classList.remove('theme-de');
});