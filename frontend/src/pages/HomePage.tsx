@@ .. @@
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [contactForm, setContactForm] = useState({ name: '', message: '' });
  const [submitStatus, setSubmitStatus] = useState('');
  const [loadingProducts, setLoadingProducts] = useState(false);

  useEffect(() => {
    fetchData();
@@ .. @@
  const fetchData = async () => {
    setLoadingProducts(true);
    try {
      const [servicesRes, productsRes, newsRes] = await Promise.all([
        axios.get('/api/services'),
        axios.get('/api/products?limit=12'),
        axios.get('/api/news')
      ]);
      
      setServices(servicesRes.data);
      setProducts(productsRes.data.products || productsRes.data);
      setNews(newsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoadingProducts(false);
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name.trim() || !contactForm.message.trim()) {
      setSubmitStatus('error');
      return;
    }
    
    try {
      await axios.post('/api/contact', contactForm);
      setSubmitStatus('success');
@@ .. @@
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory && product.inStock;
  });

  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];
@@ .. @@
            </select>
          </div>

          {loadingProducts ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div key={product._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        product.inStock 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3 text-sm">{product.description}</p>
                    <div className="mb-3">
                      <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                        {product.category}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-green-600">₹{product.price}</span>
                      <button 
                        onClick={() => onNavigate('signup')}
                        className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 disabled:opacity-50"
                        disabled={!product.inStock}
                      >
                        <ShoppingCart className="h-4 w-4" />
                        <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {!loadingProducts && filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="mt-4 text-green-600 hover:text-green-700 font-medium"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>
@@ .. @@
                {submitStatus === 'success' && (
                  <div className="text-green-600 text-center">Message sent successfully!</div>
                )}
                {submitStatus === 'error' && (
                  <div className="text-red-600 text-center">Please fill in all fields correctly.</div>
                )}
              </form>
            </div>