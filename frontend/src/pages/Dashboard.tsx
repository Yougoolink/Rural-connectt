@@ .. @@
   const [editingProfile, setEditingProfile] = useState(false);
   const [profileForm, setProfileForm] = useState({
     name: user.name,
-    phone: user.phone || ''
+    phone: user.phone || '',
+    email: user.email
   });
   const [searchTerm, setSearchTerm] = useState('');
+  const [selectedCategory, setSelectedCategory] = useState('all');
+  const [loading, setLoading] = useState(false);
+  const [message, setMessage] = useState('');
 
   useEffect(() => {
@@ .. @@
   const fetchBookings = async () => {
     try {
       const token = localStorage.getItem('token');
       const response = await axios.get('/api/bookings', {
         headers: { Authorization: `Bearer ${token}` }
       });
-      setBookings(response.data);
+      setBookings(response.data.bookings || response.data);
     } catch (error) {
       console.error('Error fetching bookings:', error);
@@ .. @@
   const placeOrder = async () => {
+    if (cart.length === 0) return;
+    
+    setLoading(true);
     try {
       const token = localStorage.getItem('token');
       const totalAmount = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
       
-      await axios.post('/api/bookings', {
-        items: cart,
+      const bookingData = {
+        items: cart.map(item => ({
+          product: item.product._id,
+          quantity: item.quantity,
+          price: item.product.price
+        })),
         totalAmount
-      }, {
+      };
+      
+      await axios.post('/api/bookings', bookingData, {
         headers: { Authorization: `Bearer ${token}` }
       });
 
       saveCart([]);
       fetchBookings();
       setActiveTab('bookings');
+      setMessage('Order placed successfully!');
+      setTimeout(() => setMessage(''), 3000);
     } catch (error) {
       console.error('Error placing order:', error);
+      setMessage('Failed to place order. Please try again.');
+      setTimeout(() => setMessage(''), 3000);
+    } finally {
+      setLoading(false);
     }
   };
 
   const updateProfile = async () => {
+    setLoading(true);
     try {
       const token = localStorage.getItem('token');
       await axios.put('/api/auth/profile', profileForm, {
         headers: { Authorization: `Bearer ${token}` }
       });
       setEditingProfile(false);
+      setMessage('Profile updated successfully!');
+      setTimeout(() => setMessage(''), 3000);
     } catch (error) {
       console.error('Error updating profile:', error);
+      setMessage('Failed to update profile. Please try again.');
+      setTimeout(() => setMessage(''), 3000);
+    } finally {
+      setLoading(false);
     }
   };
 
   const filteredProducts = products.filter(product =>
-    product.name.toLowerCase().includes(searchTerm.toLowerCase())
+    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
+    (selectedCategory === 'all' || product.category === selectedCategory)
   );
 
+  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];
   const totalCartAmount = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
 
   return (
@@ .. @@
         <div className="mb-8">
           <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
           <p className="text-gray-600">Manage your account and track your orders</p>
+          {message && (
+            <div className={`mt-4 p-3 rounded-lg ${
+              message.includes('success') 
+                ? 'bg-green-100 text-green-700 border border-green-200' 
+                : 'bg-red-100 text-red-700 border border-red-200'
+            }`}>
+              {message}
+            </div>
+          )}
         </div>
 
@@ .. @@
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
-                    <p className="text-gray-900">{user.email}</p>
+                    <input
+                      type="email"
+                      value={profileForm.email}
+                      onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
+                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
+                    />
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
@@ .. @@
                   <button
                     onClick={updateProfile}
+                    disabled={loading}
                     className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                   >
-                    <Save className="h-4 w-4" />
-                    <span>Save Changes</span>
+                    {loading ? (
+                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
+                    ) : (
+                      <Save className="h-4 w-4" />
+                    )}
+                    <span>{loading ? 'Saving...' : 'Save Changes'}</span>
                   </button>
                 </div>
@@ .. @@
           <div className="bg-white rounded-lg shadow-sm p-6">
             <div className="mb-6">
               <h2 className="text-xl font-semibold text-gray-900 mb-4">Available Products</h2>
-              <input
-                type="text"
-                placeholder="Search products..."
-                value={searchTerm}
-                onChange={(e) => setSearchTerm(e.target.value)}
-                className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
-              />
+              <div className="flex flex-col sm:flex-row gap-4">
+                <input
+                  type="text"
+                  placeholder="Search products..."
+                  value={searchTerm}
+                  onChange={(e) => setSearchTerm(e.target.value)}
+                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
+                />
+                <select
+                  value={selectedCategory}
+                  onChange={(e) => setSelectedCategory(e.target.value)}
+                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
+                >
+                  {categories.map(category => (
+                    <option key={category} value={category}>
+                      {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
+                    </option>
+                  ))}
+                </select>
+              </div>
             </div>
 
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
@@ .. @@
                 <div className="border-t pt-4">
                   <div className="flex items-center justify-between mb-4">
                     <span className="text-lg font-semibold">Total: ₹{totalCartAmount}</span>
                     <button
                       onClick={placeOrder}
+                      disabled={loading || cart.length === 0}
                       className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 font-semibold"
                     >
-                      Place Order
+                      {loading ? (
+                        <div className="flex items-center space-x-2">
+                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
+                          <span>Placing Order...</span>
+                        </div>
+                      ) : (
+                        'Place Order'
+                      )}
                     </button>
                   </div>
                 </div>
@@ .. @@
                     <div className="flex items-center justify-between mb-3">
                       <div>
                         <span className="font-semibold">Order #{booking._id.slice(-6)}</span>
                         <span className="ml-3 text-sm text-gray-500">
                           {new Date(booking.createdAt).toLocaleDateString()}
                         </span>
                       </div>
                       <span className={`px-2 py-1 text-xs font-medium rounded-full ${
-                        booking.status === 'completed' 
+                        booking.status === 'delivered' 
                           ? 'bg-green-100 text-green-800'
-                          : 'bg-yellow-100 text-yellow-800'
+                          : booking.status === 'cancelled'
+                          ? 'bg-red-100 text-red-800'
+                          : booking.status === 'shipped'
+                          ? 'bg-blue-100 text-blue-800'
+                          : 'bg-yellow-100 text-yellow-800'
                       }`}>
-                        {booking.status}
+                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                       </span>
                     </div>
                     
                     <div className="mb-3">
                       {booking.items.map((item, index) => (
                         <div key={index} className="text-sm text-gray-600">
-                          {item.product.name} × {item.quantity}
+                          {item.product?.name || 'Product'} × {item.quantity} - ₹{item.price * item.quantity}
                         </div>
                       ))}
                     </div>