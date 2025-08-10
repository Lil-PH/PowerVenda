document.addEventListener('DOMContentLoaded', () => {
    // --- BANCO DE DADOS (SIMULADO) ---
    const products = [
        { id: 1, name: 'Smartwatch Premium', price: 349.90, oldPrice: 499.90, image: 'https://m.media-amazon.com/images/I/51bjAlTBzZL._AC_SL1000_.jpg', category: 'eletronicos', rating: 4.5, reviews: 128 },
        { id: 2, name: 'Fones Bluetooth', price: 224.90, oldPrice: 299.90, image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80', category: 'eletronicos', rating: 4.2, reviews: 89 },
        { id: 3, name: 'Câmera DSLR Profissional', price: 3059.90, oldPrice: 3599.90, image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&q=80', category: 'eletronicos', rating: 4.9, reviews: 215 },
        { id: 4, name: 'Notebook Ultra Slim', price: 3439.90, oldPrice: 4299.90, image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80', category: 'eletronicos', rating: 4.7, reviews: 176 },
        { id: 5, name: 'Tênis Esportivo Premium', price: 239.90, oldPrice: 399.90, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80', category: 'esportes', rating: 4.6, reviews: 64 },
        { id: 6, name: 'Camisa Casual', price: 89.90, oldPrice: 129.90, image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80', category: 'moda', rating: 4.4, reviews: 150 },
        { id: 7, name: 'Sofá Moderno', price: 1899.90, oldPrice: 2499.90, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80', category: 'casa', rating: 4.8, reviews: 98 },
        { id: 8, name: 'Halteres Ajustáveis', price: 499.90, oldPrice: 699.90, image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80', category: 'esportes', rating: 5.0, reviews: 210 },
    ];

    // let cartItems = [];
    // let wishlistItems = [];
    let currentFilteredProducts = [...products];

    // --- ELEMENTOS DO DOM ---
    const productsGrid = document.getElementById('products-grid');
    const noResultsDiv = document.getElementById('no-results');
    const sortOptions = document.getElementById('sort-options');
    const categoryButtons = document.querySelectorAll('.category-filter button');
    const searchInput = document.getElementById('search-input');
    const searchInputMobile = document.getElementById('search-input-mobile');

    // --- RENDERIZAÇÃO ---
    const renderProducts = (productArray) => {
        productsGrid.innerHTML = '';
        noResultsDiv.classList.toggle('hidden', productArray.length > 0);

        productArray.forEach(product => {
            const discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
            // const isInWishlist = wishlistItems.some(item => item.id === product.id);
            const productCard = document.createElement('div');
            productCard.className = 'bg-white rounded-lg overflow-hidden shadow-md product-card transition duration-300 flex flex-col';
            productCard.innerHTML = `
                <div class="relative">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-56 object-cover">
                    <div class="discount-badge bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">-${discount}%</div>
                </div>
                <div class="p-4 flex flex-col flex-grow">
                    <h3 class="font-semibold text-lg mb-1 h-14">${product.name}</h3>
                    <div class="flex items-center mb-2">
                        <div class="flex text-yellow-400"><i class="fas fa-star"></i><span class="ml-1">${product.rating.toFixed(1)}</span></div>
                        <span class="text-gray-500 text-sm ml-2">(${product.reviews})</span>
                    </div>
                    <div class="flex items-baseline mt-auto">
                        <span class="text-gray-500 line-through mr-2">R$ ${product.oldPrice.toFixed(2).replace('.', ',')}</span>
                        <span class="text-blue-600 font-bold text-xl">R$ ${product.price.toFixed(2).replace('.', ',')}</span>
                    </div>
                    <button class="add-to-cart-btn mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition duration-300" data-id="${product.id}">
                        <i class="fas fa-shopping-cart mr-2"></i> Comprar
                    </button>
                </div>
            `;
            productsGrid.appendChild(productCard);
        });
        // attachProductListeners();
    };

    // --- FILTRAGEM E ORDENAÇÃO ---
    const applyFiltersAndSort = () => {
        const activeCategoryButton = document.querySelector('.category-filter button.bg-blue-600');
        const category = activeCategoryButton ? activeCategoryButton.dataset.category : 'todos';
        const searchTerm = searchInput.value.toLowerCase();
        
        // 1. Filtro
        let filtered = products.filter(product => {
            const matchesCategory = category === 'todos' || product.category === category;
            const matchesSearch = product.name.toLowerCase().includes(searchTerm);
            return matchesCategory && matchesSearch;
        });

        // 2. Ordenação
        const sortValue = sortOptions.value;
        if (sortValue === 'price-asc') filtered.sort((a, b) => a.price - b.price);
        if (sortValue === 'price-desc') filtered.sort((a, b) => b.price - a.price);
        if (sortValue === 'rating-desc') filtered.sort((a, b) => b.rating - a.rating);
        
        currentFilteredProducts = filtered;
        renderProducts(currentFilteredProducts);
    };

    // --- LISTENERS DE EVENTOS ---
    categoryButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            categoryButtons.forEach(btn => {
                btn.classList.remove('bg-blue-600', 'text-white');
                btn.classList.add('bg-gray-100', 'hover:bg-gray-200');
            });
            e.currentTarget.classList.remove('bg-gray-100', 'hover:bg-gray-200');
            e.currentTarget.classList.add('bg-blue-600', 'text-white');
            applyFiltersAndSort();
        });
    });

    sortOptions.addEventListener('change', applyFiltersAndSort);
    searchInput.addEventListener('input', applyFiltersAndSort);
    searchInputMobile.addEventListener('input', (e) => {
        searchInput.value = e.target.value;
        applyFiltersAndSort();
    });

    // Remova ou mantenha as seções comentadas, dependendo de sua necessidade
    // (Ex: `attachProductListeners`, `updateCart`, `updateWishlist`, `modals`, `showToast`)

    // --- INICIALIZAÇÃO GERAL ---
    applyFiltersAndSort();
    document.getElementById('back-to-top').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    document.getElementById('topo-da-pagina').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    window.addEventListener('scroll', () => document.getElementById('back-to-top').classList.toggle('hidden', window.pageYOffset <= 300));
});