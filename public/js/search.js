// const button = document.querySelector('.button');
const button = document.getElementById('searchForm');

button.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchArea = document.querySelector('input').value;
    const url = '/weather?address=' + encodeURIComponent(searchArea);
console.log(url)
    fetch(url)
    .then(res => res.json())
    .then(resp => {
        console.log(resp)
        document.querySelector('.weather').style.display = 'block';
        document.querySelector('.weather').innerHTML = '<span>Latitude: ' + resp.latitude + ' <br> Longitude: ' + resp.longitude + '<br> Location: ' + resp.location;
    })
});
