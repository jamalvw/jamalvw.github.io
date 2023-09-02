const targets = [...document.querySelectorAll('.fade-in-element')];
const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3,
}

let transitioning = false;

const callback = (entries, observer) => {
    entries.forEach((entry) => { 
        if (!transitioning && entry.isIntersecting) {
            const target = entry.target;
            console.log("locking");
            // Lock the callback
            transitioning = true;
            // Show the element
            target.classList.add('visible');
            observer.unobserve(target);
            // Create a handler to unlock the callback after transition
            target.addEventListener('transitionend', () => {
                transitioning = false;
                targets.splice(targets.indexOf(target), 1);
                targets.forEach((t) => {
                    observer.unobserve(t);
                    observer.observe(t);
                });
                target.removeEventListener('transitionend', handler);
            }, { once: true });
        }
    })
}

const observer = new IntersectionObserver(callback, options);

targets.forEach((target) => observer.observe(target));