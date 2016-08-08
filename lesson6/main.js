var fibonacci = function(n) {
    if(n < 0 || n > 10 ) {
        throw new Error('n值应在0-10之间');
    }
    if(n === 0) {
        return 0;
    }
    if(n === 1) {
        return 1;
    }
    if(typeof n !== 'number') {
        throw new Error('n should be a Number');
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
};

if(require.main === module) {
    var n = Number(process.argv[2]);
    console.log('fibonacci(' + n + ')', fibonacci(n));
}

exports.fibonacci = fibonacci;