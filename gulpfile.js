var gulp = require('gulp');
var shell = require('gulp-shell');
var insert = require('gulp-insert');
var rename = require('gulp-rename');
var minifyCss = require('gulp-minify-css');
var concatCss = require('gulp-concat-css');
var sourcemaps = require('gulp-sourcemaps');
var runSequence = require('run-sequence');
var del = require('del');
var babel = require("gulp-babel");

var amd_path = "build/amd";
var build_path= "build";
var packages = require("./src/include.json").packages;
var amd_config = require("./amd-config.json");
var closure_path = "node_modules/google-closure-compiler/compiler.jar";

var paths = {
    ts_core_files: [
        'src/nid/TTTGame.ts'
    ]
};

gulp.task('clean', function(cb) {return del([build_path+"/es5/"],{force:true}, cb);});
gulp.task('clean_min', function(cb) {return del([build_path+"/min/"],{force:true}, cb);});

//TypeScript Compile Commands
var tsc_cmd = 'tsc -t es5 --out <%= dest(file.path) %> <%= file.path %> <%= include() %>  --sourceMap --declaration';
var closure_cmd = 'java -jar <%= CLOSURE() %> --compilation_level SIMPLE_OPTIMIZATIONS --js  <%= file.path %> --js_output_file <%= dest(file.path) %>';
var echo = 'echo "[--:--:--] Compiling \033[1;33m<%= className(file.path) %>\033[0m';

gulp.task('compile', function(){
    return gulp.src(paths.ts_core_files)
        .pipe(shell([echo+' (es5)"',tsc_cmd], {
            templateData: {
                dest: function (s) {
                    var d = s.substring(s.lastIndexOf("\\")+1, s.length);
                    return build_path+"/es5/"+d.replace(/ts/, 'js');
                },
                className: function(s){
                    return s.substring(s.lastIndexOf("\\")+1, s.length);
                },
                include:function(){
                    var includes = "";
                    for(var i = 0; i < packages.length; i++){
                        includes += "src/"+packages[i]+" ";
                    }
                    return includes;
                }
            }
        }));
});
gulp.task('exportES5_AMD', function() {

    for(var i=0; i < amd_config.modules.length;i++){
        var m = amd_config.modules[i];
        var target = amd_config.baseDir.es5 +"/"+m.class+".js";
        var define = m.define == ""?"define(":'define("'+m.define+'",';
        var dependencies = (m.dependencies.length > 0?'["'+m.dependencies.join('","')+'"]':"[]") + ',';
        var method = ' function('+(m.imports.length > 0?m.imports.join(','):"")+') {\n';
        var returns = '\n\treturn '+m.returns+';\n});';
        var result = gulp.src(target)
            .pipe(sourcemaps.init())
            .pipe(insert.wrap(define + dependencies + method , returns))
            .pipe(rename(function (path) {
                      if(path.extname === '.js') {
                          path.basename = m.name;
                      }
                  }))
            .pipe(gulp.dest(amd_path));
    }
    return result;
});
//Optimize
gulp.task('optimize', function() {
    return gulp.src(build_path+"/es5/*.js")
        .pipe(sourcemaps.init())
        .pipe(uglify({ outSourceMap: true }))
        .pipe(rename(function (path) {
            if(path.extname === '.js') {
                path.basename += '.min';
            }
        }))
        .pipe(gulp.dest(build_path+"/min/"));
});
gulp.task('mkdir_min', ['clean_min'], shell.task([
    "mkdir "+build_path+"\\min"
]));
gulp.task('optimize', ['mkdir_min'], function(){
    return gulp.src(build_path+"/es5/*.js")
        .pipe(shell([echo+' (min)"',closure_cmd], {
                  templateData: {
                      dest: function (s) {
                          var d = s.substring(s.lastIndexOf("\\")+1, s.length);
                          return build_path+"\\min\\"+d.replace(/js/, 'min.js');
                      },
                      className: function(s){
                          return s.substring(s.lastIndexOf("\\")+1, s.length);
                      },
                      CLOSURE:function(){
                          return closure_path;
                      }
                  }
              }));
});
gulp.task('watch', function() {
    gulp.watch(['src/**/*.ts'], ['compile']);
});
gulp.task('build', function(callback){
    runSequence('clean','compile','exportES5_AMD', callback);
});
// The default task (called when you run `gulp` from cli)
gulp.task('default', ['build']);