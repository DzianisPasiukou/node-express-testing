module.exports = function (grunt) {
    // Загружаем плагины
    [
        'grunt-cafe-mocha',
        'grunt-contrib-jshint',
        'grunt-exec',
    ].forEach(function (task) {
        grunt.loadNpmTasks(task);
    });
    // Настраиваем плагины
    grunt.initConfig({
        cafemocha: {
            all: { src: 'qa/tests-*.js', options: { ui: 'tdd' }, }
        },
        jshint: {
            options: {
                jshintrc: true
            },
            app: ['meadowlark.js', 'public/js/**/*.js', 'src/**/*.js'],
            qa: ['Gruntfile.js', 'public/qa/**/*.js', 'qa/**/*.js'],
        },
        exec: {
            // linkchecker:
            // { cmd: 'linkchecker http://localhost:3000' }
        },
    });
    // Регистрируем задания
    grunt.registerTask('default', ['cafemocha', 'jshint']);
};
