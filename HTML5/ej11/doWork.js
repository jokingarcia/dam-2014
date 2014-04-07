this.addEventListener('message', function(e) {
    var data = e.data;
    switch (data.cmd) {
        case 'calculate':
            this.postMessage('Primos: '+getPrimes(data.msg));
            break;
        default:
            this.postMessage('Unknown command: '+data.msg);
    }
}, false);
function getPrimes(max) {
    var sieve = [], i, j, primes = [];
    for (i = 2; i <= max; ++i) {
        if (!sieve[i]) {
            // i has not been marked -- it is prime
            primes.push(i);
            for (j = i << 1; j <= max; j += i) {
                sieve[j] = true;
            }
        }
    }
    return primes;
}


