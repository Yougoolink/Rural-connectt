    
    // Sorting
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
@@ .. @@
     const bookings = await Booking.find(query)
       .populate('items.product')
      .sort(sortOptions)
       .skip(skip)
       .limit(parseInt(limit));

     const total = await Booking.countDocuments(query);

     res.json({
       bookings,
       pagination: {
         page: parseInt(page),
         limit: parseInt(limit),
         total,
        pages: Math.ceil(total / limit),
        hasNextPage: parseInt(page) < Math.ceil(total / limit),
        hasPrevPage: parseInt(page) > 1
       }
    const { status, limit = 10, page = 1, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
     });
     console.error('Error fetching bookings:', error);
     res.status(500).json({ 
       message: 'Failed to fetch bookings', 
       error: error.message 
     });
   }
 });