(function () {
  const doc = document.documentElement

  doc.classList.remove('no-js')
  doc.classList.add('js')

  // Reveal animations
  if (document.body.classList.contains('has-animations')) {
    /* global ScrollReveal */
    const sr = window.sr = ScrollReveal()

    sr.reveal('.feature, .testimonial', {
      duration: 600,
      distance: '50px',
      easing: 'cubic-bezier(0.5, -0.01, 0, 1.005)',
      origin: 'bottom',
      interval: 100
    })

    /* global anime */
    const heroAnimation = anime.timeline({ autoplay: false })
    const strokedElement = document.querySelector('.stroke-animation')

    strokedElement.setAttribute('stroke-dashoffset', anime.setDashoffset(strokedElement))

    heroAnimation.add({
      targets: '.stroke-animation',
      strokeDashoffset: {
        value: 0,
        duration: 2000,
        easing: 'easeInOutQuart'
      },
      strokeWidth: {
        value: [0, 2],
        duration: 2000,
        easing: 'easeOutCubic'
      },
      strokeOpacity: {
        value: [1, 0],
        duration: 1000,
        easing: 'easeOutCubic',
        delay: 1000
      },
      fillOpacity: {
        value: [0, 1],
        duration: 500,
        easing: 'easeOutCubic',
        delay: 1300
      }
    }).add({
      targets: '.fadeup-animation',
      offset: 1300, // Starts at 1300ms of the timeline
      translateY: {
        value: [100, 0],
        duration: 1500,
        easing: 'easeOutElastic',
        delay: function (el, i) {
          return i * 150
        }
      },
      opacity: {
        value: [0, 1],
        duration: 200,
        easing: 'linear',
        delay: function (el, i) {
          return i * 150
        }
      }
    }).add({
      targets: '.fadeleft-animation',
      offset: 1300, // Starts at 1300ms of the timeline
      translateX: {
        value: [40, 0],
        duration: 400,
        easing: 'easeOutCubic',
        delay: function (el, i) {
          return i * 100
        }
      },
      opacity: {
        value: [0, 1],
        duration: 200,
        easing: 'linear',
        delay: function (el, i) {
          return i * 100
        }
      }
    })

    doc.classList.add('anime-ready')
    heroAnimation.play()
  }

}())

  document.addEventListener('DOMContentLoaded', function() {
    const earlyAccessBtn = document.getElementById('earlyAccessBtn');
    
    earlyAccessBtn.addEventListener('click', function(event) {
      event.preventDefault(); // Prevent default action
      
      const email = document.getElementById('emailInput').value;
  
      // Validate email (you can have a more robust validation)
      if (email.includes('@')) {
        fetch('https://hook.us1.make.com/a4w2swlet7dpkbsxrubivj91kgmopqbj', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: email })
        }).then(response => response.json())
        .then(data => console.log('Data sent successfully:', data))
        .catch((error) => console.error('Error:', error));
      } else {
        alert('Please enter a valid email.');
      }
    });
  });
  