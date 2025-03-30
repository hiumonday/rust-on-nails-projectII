// Make sure this code runs after DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggleButton');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main-content');
    
    // Add transition to main content for smooth movement
    if (mainContent) {
        mainContent.classList.add('transition-all', 'duration-200', 'ease-in-out');
    }
    
    toggleButton?.addEventListener('click', () => {
        // Toggle sidebar visibility
        sidebar.classList.toggle('translate-x-0');
        sidebar.classList.toggle('-translate-x-full');
        
        // Adjust main content position when sidebar opens/closes
        // Only on mobile/tablet views (when sidebar is fixed)
        if (window.innerWidth < 1024) { // lg breakpoint in Tailwind
            if (sidebar.classList.contains('translate-x-0')) {
                // Sidebar is open, push content to the right
                mainContent.style.marginLeft = '16rem'; // 64 = 16rem in Tailwind
            } else {
                // Sidebar is closed, reset content position
                mainContent.style.marginLeft = '0';
            }
        }
    });
    
    // Reset layout on window resize (especially when switching between mobile/desktop)
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024) {
            // On desktop, ensure proper layout
            mainContent.style.marginLeft = '';
        } else {
            // On mobile, respect current sidebar state
            mainContent.style.marginLeft = sidebar.classList.contains('translate-x-0') ? '16rem' : '0';
        }
    });
});