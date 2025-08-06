@@ .. @@
   const handleContactSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
+    if (!contactForm.name.trim() || !contactForm.message.trim()) {
+      setSubmitStatus('error');
+      return;
+    }
+    
     try {
       await axios.post('/api/contact', contactForm);
       setSubmitStatus('success');
@@ .. @@
   const filteredProducts = products.filter(product => {
     const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
     const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
-    return matchesSearch && matchesCategory;
+    return matchesSearch && matchesCategory && product.inStock;
   });
 
   const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];
@@ .. @@
                 {submitStatus === 'success' && (
                   <div className="text-green-600 text-center">Message sent successfully!</div>
                 )}
                 {submitStatus === 'error' && (
-                  <div className="text-red-600 text-center">Failed to send message. Please try again.</div>
+                  <div className="text-red-600 text-center">Please fill in all fields correctly.</div>
                 )}
               </form>
             </div>