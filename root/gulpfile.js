// Variables for importing gulp packages
var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss']) // Return the sass files from node modules and src/scss
        .pipe(sass()) // Pre compile with sass
        .pipe(gulp.dest("src/css")) // Put the compiled css into the src/css folder
        .pipe(browserSync.stream()); // Reload browser
});

// Move the javascript files into our /src/js folder
gulp.task('js', function() {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js']) // Return these files from node modules
        .pipe(gulp.dest("src/js")) // Placing them in the src/js folder
        .pipe(browserSync.stream()); // Reload the browser
});

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./src"  
    });
    // Launch a local host server and watch the below styling and html files
    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], ['sass']);
    gulp.watch("src/*.html").on('change', browserSync.reload);
});

// Set gulp task names to default and run the js and serve tasks when used
gulp.task('default', ['js','serve']);


// Thanks to https://coursetro.com/posts/code/130/Learn-Bootstrap-4-Final-in-2018-with-our-Free-Crash-Course