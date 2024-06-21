<script>
        function showOverlay() {
            var overlay = document.getElementById('overlay');
            overlay.style.display = 'flex';
        }

        function redirectTo(url) {
            showOverlay();
            setTimeout(function() {
                window.location.href = url;
            }, 1000);
        }

        document.addEventListener('click', function(event) {
            var target = event.target;

            if (target.tagName === 'BUTTON' && target.getAttribute('onclick')) {
                var url = target.getAttribute('onclick').match(/window\.location\.href='(.*?)'/)[1];

                if (url) {
                    event.preventDefault();
                    redirectTo(url);
                }
            }
        });

        document.addEventListener('submit', function(event) {
            var form = event.target;

            if (form.tagName === 'FORM') {
                event.preventDefault();
                showOverlay();
                setTimeout(function() {
                    form.submit();
                }, 1000);
            }
        });
        </script>  