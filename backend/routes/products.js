@@ .. @@
 // Get all products with optional filtering
 router.get('/', async (req, res) => {
   try {
-    const { category, search, inStock } = req.query;
+    const { category, search, inStock, limit = 50, page = 1 } = req.query;
     let query = {};

     // Filter by category
@@ .. @@
     if (search) {
       query.name = { $regex: search, $options: 'i' };
     }

-    const products = await Product.find(query).sort({ name: 1 });
-    res.json(products);
+    const skip = (page - 1) * limit;
+    const products = await Product.find(query)
+      .sort({ name: 1 })
+      .skip(skip)
+      .limit(parseInt(limit));
+    
+    const total = await Product.countDocuments(query);
+    
+    res.json({
+      products,
+      pagination: {
+        page: parseInt(page),
+        limit: parseInt(limit),
+        total,
+        pages: Math.ceil(total / limit)
+      }
+    });
   } catch (error) {
     console.error('Error fetching products:', error);
     res.status(500).json({ message: 'Failed to fetch products', error: error.message });
@@ .. @@
 // Get products by category
 router.get('/category/:category', async (req, res) => {
   try {
     const { category } = req.params;
+    const { limit = 20 } = req.query;
+    
     const products = await Product.find({ 
       category: category.toLowerCase(),
       inStock: true 
-    }).sort({ name: 1 });
+    })
+    .sort({ name: 1 })
+    .limit(parseInt(limit));
     
     res.json(products);
   } catch (error) {