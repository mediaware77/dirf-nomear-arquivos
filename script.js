document.addEventListener('DOMContentLoaded', function() {
    // Dark Mode Toggle Functionality
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    
    // Check for saved dark mode preference
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    // Apply saved preference
    if (isDarkMode) {
        body.classList.add('dark-mode');
        darkModeToggle.checked = true;
    }
    
    // Toggle dark mode
    darkModeToggle.addEventListener('change', function() {
        if (this.checked) {
            body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'true');
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'false');
        }
    });
    
    // Folder Selection and PDF Listing Functionality
    const folderSelectBtn = document.getElementById('folderSelectBtn');
    const pdfListContainer = document.getElementById('pdfListContainer');
    
    // Check if running in a cross-origin context
    const isCrossOrigin = () => {
        try {
            // Fix: Properly check if running on localhost or https
            const origin = window.location.origin;
            return !origin || 
                   origin === 'null' || 
                   !(origin.startsWith('http://localhost') || 
                     origin.startsWith('https://'));
        } catch (e) {
            return true;
        }
    };

    folderSelectBtn.addEventListener('click', async function() {
        try {
            // Check for cross-origin context first
            if (isCrossOrigin()) {
                throw new Error('Esta aplicação precisa ser executada em um servidor local seguro para acessar arquivos. Por favor, certifique-se de que está acessando através de http://localhost ou https://.');
            }

            // Check if the File System Access API is supported
            if ('showDirectoryPicker' in window) {
                // Request directory access
                const directoryHandle = await window.showDirectoryPicker();
                
                // Clear previous list
                pdfListContainer.innerHTML = '';
                
                let pdfFound = false;
                
                // Process all files in the directory
                for await (const entry of directoryHandle.values()) {
                    if (entry.kind === 'file' && entry.name.toLowerCase().endsWith('.pdf')) {
                        pdfFound = true;
                        
                        // Create PDF item element
                        const pdfItem = document.createElement('div');
                        pdfItem.className = 'pdf-item';
                        pdfItem.innerHTML = `<i class="fas fa-file-pdf"></i> ${entry.name}`;
                        
                        // Add to container
                        pdfListContainer.appendChild(pdfItem);
                    }
                }
                
                // Show message if no PDFs found
                if (!pdfFound) {
                    pdfListContainer.innerHTML = '<p class="empty-message">Nenhum arquivo PDF encontrado na pasta selecionada</p>';
                }
            } else {
                // Fallback for browsers that don't support the File System Access API
                alert('Seu navegador não suporta a seleção de pastas. Por favor, use um navegador mais recente como Chrome ou Edge.');
            }
        } catch (error) {
            console.error('Erro ao selecionar pasta:', error);
            let errorMessage = 'Erro ao acessar a pasta';
            
            // Provide more specific error messages
            if (error.name === 'AbortError') {
                // User cancelled the selection
                return;
            } else if (error.name === 'SecurityError' || error.message.includes('cross origin')) {
                errorMessage = 'Esta aplicação precisa ser executada em um servidor local seguro para acessar arquivos. Por favor, certifique-se de que está acessando através de http://localhost ou https://.';
            } else {
                errorMessage = `${errorMessage}: ${error.message}`;
            }
            
            pdfListContainer.innerHTML = `<p class="empty-message">${errorMessage}</p>`;
        }
    });
});