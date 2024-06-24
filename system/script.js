  <script>
    function showOverlay() {
        var overlay = document.getElementById('overlay');
        overlay.style.display = 'flex';
    }

    function hideOverlay() {
        var overlay = document.getElementById('overlay');
        overlay.style.display = 'none';
    }

    function redirectTo(url) {
        showOverlay();
        setTimeout(function() {
            window.location.href = url;
        }, 1000);
    }

    document.querySelectorAll('select').forEach(function(selectElement) {
        selectElement.addEventListener('change', function(event) {
            event.preventDefault();
            var paramName = this.id || this.name;
            var paramValue = this.value;
            var urlParams = new URLSearchParams(window.location.search);
            urlParams.set(paramName, paramValue);
            urlParams.delete('page');
            redirectTo(window.location.pathname + '?' + urlParams.toString());
        });
    });

    document.addEventListener('DOMContentLoaded', function() {
        function submitFormWithOverlay(form) {
            event.preventDefault();
            showOverlay();
            setTimeout(function() {
                form.submit();
            }, 1000);
        }

        document.querySelectorAll('button').forEach(function(button) {
            button.addEventListener('click', function(event) {
                event.preventDefault();
                var url = this.getAttribute('onclick');
                if (url && url.includes("window.location.href")) {
                    url = url.match(/window\.location\.href='(.*?)'/)[1];
                    redirectTo(url);
                }
            });
        });

        document.querySelectorAll('form').forEach(function(form) {
            form.addEventListener('submit', function(event) {
                submitFormWithOverlay(form);
            });
        });

        document.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function(event) {
                event.preventDefault();
                var url = this.getAttribute('onclick');
                if (url && url.includes("window.location.href")) {
                    url = url.match(/window\.location\.href='(.*?)'/)[1];
                    redirectTo(url);
                }
            });
        });

        document.querySelectorAll('.filters button').forEach(function(filterButton) {
            filterButton.addEventListener('click', function(event) {
                var filterValue = this.getAttribute('onclick');
                if (filterValue) {
                    event.preventDefault();
                    var filter = filterValue.match(/filterSessions\('(.*?)'\)/)[1];
                    var urlParams = new URLSearchParams(window.location.search);
                    urlParams.set('filter', filter);
                    urlParams.delete('page');
                    redirectTo(window.location.pathname + '?' + urlParams.toString());
                }
            });
        });


        document.querySelectorAll('.pagination-button').forEach(function(paginationButton) {
            paginationButton.addEventListener('click', function(event) {
                event.preventDefault();
                var nextPage = this.getAttribute('onclick').match(/navigatePage\((.*?)\)/)[1];
                var urlParams = new URLSearchParams(window.location.search);
                urlParams.set('page', nextPage);
                redirectTo(window.location.pathname + '?' + urlParams.toString());
            });
        });
    });
</script>
