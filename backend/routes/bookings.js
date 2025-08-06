@@ .. @@
     const bookings = await Booking.find(query)
       .populate('items.product')
       .sort({ createdAt: -1 })
       .skip(skip)
       .limit(parseInt(limit));

     const total = await Booking.countDocuments(query);

     res.json({
       bookings,
       pagination: {
         page: parseInt(page),
         limit: parseInt(limit),
         total,
         pages: Math.ceil(total / limit)
       }
     });
   } catch (error) {
     console.error('Error fetching bookings:', error);
     res.status(500).json({ 
       message: 'Failed to fetch bookings', 
       error: error.message 
     });
   }
 });