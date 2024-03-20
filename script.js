window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("back-to-top-btn").style.display = "block";
  } else {
    document.getElementById("back-to-top-btn").style.display = "none";
  }
}

document.getElementById("back-to-top-btn").onclick = function() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

const URL_APP = "https://script.google.com/macros/s/AKfycbxEYzcBkrkZYooXToRQ-aU5E4PT7-p9LNVGo7nCDxNzDQ1luatmpCNzu6ER3-wKiVY/exec";

// находим форму в документе
const form = document.getElementById("form");

// указываем адрес отправки формы (нужно только в начале примера)
form.action = URL_APP;

// вспомогательная функция проверки заполненности формы
function isFilled(details) {
    const { name, email, phone } = details;
    if (!name) return false;
    if (!email) return false;
    if (!phone) return false;
    return true;
}

// навешиваем обработчик на отправку формы
form.addEventListener("submit", async (ev) => {
    
    // отменяем действие по умолчанию
    ev.preventDefault();

    // получаем ссылки на элементы формы
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const message = document.getElementById("message");


    // собираем данные из элементов формы
    let details = {
        name: name.value,
        email: email.value,
        phone: phone.value,
        message: message.value,
    };
    // если поля не заполнены - прекращаем обработку
    if (!isFilled(details)) return;
    // подготавливаем данные для отправки
    let formBody = [];
    for (let property in details) {
        // кодируем названия и значения параметров
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    // склеиваем параметры в одну строку
    formBody = formBody.join("&");

    // выполняем отправку данных в Google Apps
    const result = await fetch(URL_APP, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        cors: "no-cors", //<- это неправильно
        //mode: "cors", //<- оставим по умолчанию
        body: formBody,
    })
        .then((res) => res.json())
        .catch((err) => alert("Ошибка!"))
    // .then((res) => console.log(res));

    if( result.type === 'success' ) {
        name.value = '';
        email.value = '';
        phone.value = '';
        message.value = '';
        alert('Спасибо за заявку!')
    }
    if( result.type === 'error' ) {
        alert(`Ошибка( ${result.errors}`)
    }

    
});

