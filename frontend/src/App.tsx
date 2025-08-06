@@ .. @@
   const fetchData = async () => {
     try {
       const [servicesRes, productsRes, newsRes] = await Promise.all([
         axios.get('/api/services'),
         axios.get('/api/products'),
         axios.get('/api/news')
       ]);
       
       setServices(servicesRes.data);
       setProducts(productsRes.data.products || productsRes.data);
       setNews(newsRes.data);
     } catch (error) {
       console.error('Error fetching data:', error);
     }
   };