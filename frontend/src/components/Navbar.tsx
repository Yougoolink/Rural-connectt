@@ .. @@
 const Navbar: React.FC<NavbarProps> = ({ user, currentPage, onNavigate, onLogout }) => {
   const [isOpen, setIsOpen] = useState(false);
   const [showUserMenu, setShowUserMenu] = useState(false);
 
+  // Close user menu when clicking outside
+  useEffect(() => {
+    const handleClickOutside = () => setShowUserMenu(false);
+    if (showUserMenu) {
+      document.addEventListener('click', handleClickOutside);
+      return () => document.removeEventListener('click', handleClickOutside);
+    }
+  }, [showUserMenu]);
+
   const navItems = [
     { id: 'home', label: 'Home', icon: Home },
     { id: 'services', label: 'Services', icon: Settings },
@@ .. @@
                 <button
                   onClick={() => setShowUserMenu(!showUserMenu)}
                   className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium bg-green-800 hover:bg-green-900 transition-colors duration-200"
+                  onClick={(e) => {
+                    e.stopPropagation();
+                    setShowUserMenu(!showUserMenu);
+                  }}
                 >
                   <User className="h-4 w-4" />
              
  ]
}     <span>{user.name}</span>
@@ .. @@
 };
 
+// Add missing useEffect import
+import React, { useState, useEffect } from 'react';
+
 export default Navbar;