
  
  // Плавная прокрутка к секциям
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
  });
  
  // Анимация появления элементов при скролле
  function animateOnScroll() {
    const elements = document.querySelectorAll('.destination-card, .testimonial-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animate-fade-in');
        }
    });
  }
  
  window.addEventListener('scroll', animateOnScroll);
  window.addEventListener('load', animateOnScroll);
  
  // Интерактивные кнопки
  document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
    });
  });
  
  // Добавляем новый функционал

  // Мобильное меню
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener('click', () => {
          navLinks.classList.toggle('active');
      });
  }

  // Поиск направлений
  const searchInput = document.querySelector('.search-input');
  if (searchInput) {
      searchInput.addEventListener('input', (e) => {
          const searchTerm = e.target.value.toLowerCase();
          const cards = document.querySelectorAll('.destination-card');
          
          cards.forEach(card => {
              const title = card.querySelector('.destination-title').textContent.toLowerCase();
              if (title.includes(searchTerm)) {
                  card.style.display = 'block';
              } else {
                  card.style.display = 'none';
              }
          });
      });
  }

  // Подписка на рассылку
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
      newsletterForm.addEventListener('submit', (e) => {
          e.preventDefault();
          const email = newsletterForm.querySelector('.email-input').value;
          if (email) {
              alert('Спасибо за подписку! Мы отправили подтверждение на ' + email);
              newsletterForm.reset();
          }
      });
  }

  // Анимация при скролле
  const observerOptions = {
      threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('animate-fade-in');
              observer.unobserve(entry.target);
          }
      });
  }, observerOptions);

  document.querySelectorAll('.feature-card, .destination-card, .testimonial-card').forEach(el => {
      observer.observe(el);
  });

  // Заменяем функцию загрузки изображений
  function loadDestinationImages() {
    const destinations = [
        {
            img: 'https://avatars.mds.yandex.net/get-entity_search/10843572/952422192/S600xU_2x',
            fallback: 'https://avatars.mds.yandex.net/i?id=8d65e08396dd75e69f6b9f4d05a0b2d1cdcf90b7-4468494-images-thumbs&n=13',
            alt: 'Бали'
        },
        {
            img: 'https://avatars.mds.yandex.net/i?id=bf760d902839818ab6dd60e768bb629c344171ee-5686193-images-thumbs&n=13',
            fallback: 'https://avatars.mds.yandex.net/i?id=bf760d902839818ab6dd60e768bb629c344171ee-5686193-images-thumbs&n=13',
            alt: 'Париж'
        },
        {
            img: 'https://avatars.mds.yandex.net/i?id=72e2e3cfecfaa8f0df3a8a19622c31aa5bf733f3-5655706-images-thumbs&n=13',
            fallback: 'https://avatars.mds.yandex.net/i?id=72e2e3cfecfaa8f0df3a8a19622c31aa5bf733f3-5655706-images-thumbs&n=13',
            alt: 'Токио'
        }
    ];

    document.querySelectorAll('.destination-img').forEach((img, index) => {
        if (destinations[index]) {
            // Устанавливаем основное изображение
            img.src = destinations[index].img;
            // Устанавливаем альтернативный текст
            img.alt = destinations[index].alt;
            // Добавляем обработчик ошибки загрузки
            img.onerror = function() {
                this.src = destinations[index].fallback;
                // Если и запасное изображение не загрузилось, показываем заглушку
                this.onerror = function() {
                    this.src = 'https://via.placeholder.com/600x400?text=Изображение+недоступно';
                }
            }
        }
    });
  }

  // бновляем инициализацию
  document.addEventListener('DOMContentLoaded', () => {
      loadDestinationImages();
      loadHeroImage();
  });
  
  // Добавляем обработчик для кнопок в карточках направлений
  document.querySelectorAll('.destination-card .btn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault(); // Предотвращаем стандартное поведение
        const card = this.closest('.destination-card');
        const destination = card.querySelector('.destination-title').textContent;
        
        // Анимация нажатия
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
    });
  });

  // эффект при наведении на карточку
  document.querySelectorAll('.destination-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.querySelector('.btn').style.transform = 'translateY(-3px)';
    });

    card.addEventListener('mouseleave', function() {
        this.querySelector('.btn').style.transform = 'translateY(0)';
    });
  });
  
  // код для слайдера
  function initializeSlider() {
    const slider = document.querySelector('.destinations-grid');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    
    if (!slider || !prevBtn || !nextBtn) return;

    let currentIndex = 0;
    const cards = Array.from(slider.querySelectorAll('.destination-card'));
    const totalCards = allDestinations.length;
    const visibleCards = 3;

    // Функция для обновления видимости карточек
    function updateCards() {
        // Очищаем слайдер
        slider.innerHTML = '';
        
        //  новые карточки
        for (let i = 0; i < visibleCards; i++) {
            const index = (currentIndex + i) % totalCards;
            const destination = allDestinations[index];
            
            const card = document.createElement('div');
            card.className = 'destination-card';
            card.style.opacity = '0';
            card.innerHTML = `
                <img 
                    loading="lazy"
                    class="destination-img"
                    src="${destination.img}"
                    alt="${destination.title}"
                >
                <div class="destination-content">
                    <h3 class="destination-title">${destination.title}</h3>
                    <p class="destination-text">${destination.text}</p>
                    <button class="btn btn-primary">Подробнее</button>
                </div>
            `;
            
            slider.appendChild(card);
            
            // Анимация появления
            setTimeout(() => {
                card.style.transition = 'opacity 0.5s ease-in-out';
                card.style.opacity = '1';
            }, i * 100);
        }
    }

    // Обраотчик для кнопки "Предыдущий"
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalCards) % totalCards;
        updateCards();
    });

    // Обработчик для кнпки "Следующий"
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalCards;
        updateCards();
    });

    // Инициализация слайдера
    updateCards();

    // Обновление при изменении размера окна
    window.addEventListener('resize', () => {
        const width = window.innerWidth;
        if (width < 768) {
            visibleCards = 1;
        } else if (width < 992) {
            visibleCards = 2;
        } else {
            visibleCards = 3;
        }
        updateCards();
    });
  }

 
  document.addEventListener('DOMContentLoaded', () => {
      initializeSlider();
  });
  
 
  const cityCoordinates = {
      'москва': [55.753215, 37.622504],
      'санкт-петербург': [59.939095, 30.315868],
      'екатеринбург': [56.838011, 60.597465],
      'париж': [48.856614, 2.352222],
      'лондон': [51.507351, -0.127758],
      'нью-йорк': [40.712776, -74.005974],
      'токио': [35.689487, 139.691706],
      'дубай': [25.204849, 55.270783],
      'рим': [41.902783, 12.496366],
      'барселона': [41.385064, 2.173403]
  };


  document.addEventListener('DOMContentLoaded', () => {
      const searchInput = document.querySelector('.search-input');
      if (searchInput) {
          searchInput.addEventListener('input', (e) => {
              const searchTerm = e.target.value.toLowerCase();
              
              for (let city in cityCoordinates) {
                  if (city.includes(searchTerm) || searchTerm.includes(city)) {

                      if (window.map) {

                          window.map.setCenter(cityCoordinates[city], 12, {
                              duration: 500
                          });

                          const placemark = new ymaps.Placemark(cityCoordinates[city], {
                              balloonContent: `
                                  <div class="map-balloon">
                                      <h3>${city.charAt(0).toUpperCase() + city.slice(1)}</h3>
                                      <p>Найдено по вашему запросу</p>
                                  </div>
                              `
                          }, {
                              preset: 'islands#redDotIcon'
                          });

                          window.map.geoObjects.removeAll();
                          window.map.geoObjects.add(placemark);
                          placemark.balloon.open();
                      }
                      break;
                  }
              }
          });
      }
  });

  function initMap() {
      if (typeof ymaps === 'undefined') {
          console.error('Yandex Maps API не загружен');
          return;
      }

      ymaps.ready(() => {
          window.map = new ymaps.Map('map', {
              center: [55.753215, 37.622504], // Координаты центра карты (Москва)
              zoom: 4,
              controls: ['zoomControl', 'fullscreenControl']
          });

          offices.forEach(office => {
              const placemark = new ymaps.Placemark(office.coordinates, {
                  balloonContent: `
                      <div class="map-balloon">
                          <h3>${office.title}</h3>
                          <p>${office.address}</p>
                          <p>${office.phone}</p>
                      </div>
                  `
              }, {
                  preset: 'islands#blueCircleDotIcon'
              });

              window.map.geoObjects.add(placemark);
          });

          document.querySelectorAll('.office-item').forEach((item, index) => {
              item.addEventListener('click', () => {
                  const office = offices[index];
                  window.map.setCenter(office.coordinates, 15, {
                      duration: 500
                  });
              });
          });
      });
  }


  function loadYandexMaps() {
    const script = document.createElement('script');

    script.src = 'https://api-maps.yandex.ru/2.1/?apikey=3f57e599-ba97-44f7-9aa9-6e961bbb4c11&lang=ru_RU';
    script.async = true;
    script.onload = initMap;
    document.head.appendChild(script);
  }


  document.addEventListener('DOMContentLoaded', loadYandexMaps);
  

  document.addEventListener('DOMContentLoaded', () => {
      const exploreButton = document.querySelector('.hero-content .btn-primary');
      if (exploreButton) {
          exploreButton.addEventListener('click', () => {
              const mapSection = document.getElementById('map-section');
              if (mapSection) {
                  mapSection.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start'
                  });
              }
          });
      }
  });
  

  document.addEventListener('DOMContentLoaded', () => {
      const searchForm = document.querySelector('.search-box');
      if (searchForm) {
          searchForm.addEventListener('submit', function(e) {
              e.preventDefault();
              

              const destination = document.querySelector('.search-input').value;
              const date = document.querySelector('.date-input').value;
              const travelers = document.querySelector('.travelers-input').value;


              if (!destination || !date || !travelers) {
                  alert('Пожалуйста, заполните все поля');
                  return;
              }


              localStorage.setItem('bookingDetails', JSON.stringify({
                  destination,
                  date,
                  travelers
              }));


              window.location.href = 'booking.html';
          });
      }
  });


  if (window.location.pathname.includes('booking.html')) {

      const bookingDetails = JSON.parse(localStorage.getItem('bookingDetails'));
      
      if (bookingDetails) {

          document.getElementById('destination-details').textContent = 
              `Направление: ${bookingDetails.destination}`;
          document.getElementById('date-details').textContent = 
              `Дата: ${bookingDetails.date}`;
          document.getElementById('travelers-details').textContent = 
              `Количество путешественников: ${bookingDetails.travelers}`;


          const travelersContainer = document.getElementById('travelers-container');
          for (let i = 0; i < parseInt(bookingDetails.travelers); i++) {
              const travelerDiv = document.createElement('div');
              travelerDiv.className = 'traveler-info';
              travelerDiv.innerHTML = `
                  <h4>Путешественник ${i + 1}</h4>
                  <input type="text" placeholder="Имя" required>
                  <input type="text" placeholder="Фамилия" required>
                  <input type="date" placeholder="Дата рождения" required>
                  <input type="text" placeholder="Номер паспорта" required>
              `;
              travelersContainer.appendChild(travelerDiv);
          }


          const style = document.createElement('style');
          style.textContent = `
              .notification {
                  position: fixed;
                  top: -100px;
                  left: 50%;
                  transform: translateX(-50%);
                  background-color: #4CAF50;
                  color: white;
                  padding: 15px 30px;
                  border-radius: 5px;
                  box-shadow: 0 3px 10px rgba(0,0,0,0.2);
                  z-index: 1000;
                  transition: top 0.5s ease-in-out;
                  text-align: center;
              }
              .notification.show {
                  top: 20px;
              }
          `;
          document.head.appendChild(style);


          const bookingForm = document.getElementById('bookingForm');
          if (bookingForm) {
              bookingForm.addEventListener('submit', async function(e) {
                  e.preventDefault();
                  

                  const travelers = [];
                  const travelerDivs = document.querySelectorAll('.traveler-info');
                  travelerDivs.forEach(div => {
                      const inputs = div.querySelectorAll('input');
                      travelers.push({
                          firstName: inputs[0].value,
                          lastName: inputs[1].value,
                          birthDate: inputs[2].value,
                          passport: inputs[3].value
                      });
                  });

                  const email = document.querySelector('input[type="email"]').value;
                  const bookingDetails = JSON.parse(localStorage.getItem('bookingDetails'));

                  try {
 
                      const response = await fetch('http://localhost:3000/send-booking-confirmation', {
                          method: 'POST',
                          headers: {
                              'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({
                              email,
                              bookingDetails,
                              travelers
                          })
                      });

                      const result = await response.json();
                      
                      if (result.success) {

                          const notification = document.createElement('div');
                          notification.className = 'notification';
                          notification.textContent = 'Успешно. Все детали отправлены на вашу почту';
                          document.body.appendChild(notification);

                          setTimeout(() => {
                              notification.classList.add('show');
                          }, 100);

                          setTimeout(() => {
                              notification.classList.remove('show');
                              setTimeout(() => {
                                  notification.remove();
                                  localStorage.removeItem('bookingDetails');
                                  window.location.href = 'index.html';
                              }, 500);
                          }, 3000);
                      } else {
                          throw new Error('Ошибка при отправке письма');
                      }
                  } catch (error) {
                      console.error('Ошибка:', error);
                      alert('Произошла ошибка при отправке подтверждения. Пожалуйста, попробуйте позже.');
                  }
              });
          }
      }
  }
  