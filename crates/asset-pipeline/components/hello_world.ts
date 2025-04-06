class HelloWorld extends HTMLElement {
    // Properties to track component state
    private message: string = 'Hello, World!';
    private clickCount: number = 0;
    
    // Define observed attributes for reactive updates
    static get observedAttributes() {
        return ['name', 'color'];
    }
    
    constructor() {
        super();
        // Create a shadow DOM for encapsulation
        this.attachShadow({ mode: 'open' });
    }
    
    // Lifecycle: When the element is added to the document
    connectedCallback() {
        this.render();
        
        // Add click event listener
        const button = this.shadowRoot?.querySelector('button');
        if (button) {
            button.addEventListener('click', this.handleClick.bind(this));
        }
    }
    
    // Lifecycle: When observed attributes change
    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (oldValue !== newValue) {
            if (name === 'name' && newValue) {
                this.message = `Hello, ${newValue}!`;
            }
            this.render();
        }
    }
    
    // Event handler for button clicks
    handleClick() {
        this.clickCount++;
        const counter = this.shadowRoot?.querySelector('.counter');
        if (counter) {
            counter.textContent = `Clicked: ${this.clickCount} times`;
        }
        
        // Change text color randomly on click
        const greeting = this.shadowRoot?.querySelector('.greeting');
        if (greeting) {
            const randomColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
            greeting.setAttribute('style', `color: ${randomColor}`);
        }
    }
    
    // Render the component template
    render() {
        const color = this.getAttribute('color') || 'blue';
        
        this.shadowRoot!.innerHTML = `
            <style>
                .container {
                    font-family: Arial, sans-serif;
                    padding: 16px;
                    border: 2px solid ${color};
                    border-radius: 8px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    max-width: 300px;
                }
                .greeting {
                    font-size: 1.5rem;
                    color: ${color};
                    margin-bottom: 16px;
                }
                button {
                    padding: 8px 16px;
                    background-color: ${color};
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: opacity 0.3s;
                }
                button:hover {
                    opacity: 0.8;
                }
                .counter {
                    margin-top: 8px;
                    font-size: 0.9rem;
                }
            </style>
            <div class="container">
                <div class="greeting">${this.message}</div>
                <button>Click me</button>
                <div class="counter">Clicked: ${this.clickCount} times</div>
            </div>
        `;
    }
}

// Register the custom element
customElements.define('hello-world', HelloWorld);

// Simple initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // You can find all hello-world elements
    const elements = document.querySelectorAll('hello-world');
    console.log(`Found ${elements.length} hello-world elements`);
    
    // No additional functionality - just the click counting and color changing will work
});