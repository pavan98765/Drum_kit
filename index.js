document.querySelectorAll('.drum').forEach(button => {
    button.addEventListener('click', function(e) {
        const buttonInnerHTML = this.innerHTML;
        makeSound(buttonInnerHTML);
        buttonAnimation(buttonInnerHTML);
        createRippleEffect(e, this);
    });
});

document.addEventListener('keydown', function(event) {
    const key = event.key.toLowerCase();
    const button = document.querySelector(`.${key}.drum`);
    if (button) {
        makeSound(key);
        buttonAnimation(key);
        createRippleEffect(event, button);
    }
});

function createRippleEffect(event, button) {
    const ripple = document.createElement('div');
    ripple.classList.add('ripple');
    button.appendChild(ripple);

    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${event.clientX - rect.left - size/2}px;
        top: ${event.clientY - rect.top - size/2}px;
    `;

    ripple.addEventListener('animationend', () => {
        ripple.remove();
    });
}

function makeSound(key) {
    const audio = new Audio(`sounds/${getSoundFile(key)}`);
    audio.currentTime = 0; // Reset audio to start
    audio.play();
}

function getSoundFile(key) {
    const sounds = {
        w: 'crash.mp3',
        a: 'kick-bass.mp3',
        s: 'snare.mp3',
        d: 'tom-1.mp3',
        j: 'tom-2.mp3',
        k: 'tom-3.mp3',
        l: 'tom-4.mp3'
    };
    return sounds[key];
}

function buttonAnimation(currentKey) {
    const activeButton = document.querySelector("." + currentKey);
    if (activeButton) {
        activeButton.classList.add('pressed');
        
        // Add 3D press effect
        activeButton.style.transform = 'scale(0.95) translateY(5px)';
        
        setTimeout(() => {
            activeButton.classList.remove('pressed');
            activeButton.style.transform = '';
        }, 100);
    }
}

// Add some ambient particles in the background
particlesJS && particlesJS("particles-js", {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#ffffff" },
        opacity: { value: 0.5 },
        size: { value: 3 },
        move: { enable: true, speed: 2 }
    }
});