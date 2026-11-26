@echo off
setlocal
cd /d "%~dp0"

docker run --rm -it ^
  -p 4000:4000 ^
  -v "%CD%:/srv/jekyll" ^
  -w /srv/jekyll ^
  ruby:3.3 ^
  sh -c "bundle install && bundle exec jekyll serve --host 0.0.0.0 --livereload"

exit /b %ERRORLEVEL%
