// service-worker.js
self.addEventListener("install", function (event) {
	event.waitUntil(
		caches.open("static-v1").then(function (cache) {
			return cache.addAll(["/", "manifest.json", "vite.png"]);
		})
	);
});
