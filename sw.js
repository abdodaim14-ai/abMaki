const cacheName = "v1";
const assets = ["./", "./index.html", "./style.css"];

// التثبيت والكاش
self.addEventListener("install", e => {
    e.waitUntil(
        caches.open(cacheName).then(cache => {
            return cache.addAll(assets);
        })
    );
});

// تفعيل الخدمة وحذف الكاش القديم
self.addEventListener("activate", e => {
    e.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.filter(key => key !== cacheName).map(key => caches.delete(key))
            );
        })
    );
});

// استقبال إشعارات Push
self.addEventListener('push', e => {
    let data = { title: "تنبيه جديد", body: "لديك رسالة جديدة" };
    try {
        if (e.data) data = e.data.json();
    } catch (err) {
        data = { title: "تنبيه", body: e.data.text() };
    }

    const options = {
        body: data.body,
        icon: 'icon.png',
        badge: 'badge.png',
        vibrate: [200, 100, 200]
    };
    e.waitUntil(self.registration.showNotification(data.title, options));
});

// عند الضغط على الإشعار
self.addEventListener('notificationclick', e => {
    e.notification.close();
    e.waitUntil(clients.openWindow('/'));
});
