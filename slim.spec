[app]

# (str) Title of your application
title = Laner

# (str) Package name
package.name = lan_ft

# (str) Package domain (needed for android/ios packaging)
# package.domain = org.antester
package.domain = org.laner

# (str) Source code where the main.py live
source.dir = .

# (list) Source files to include (let empty to include all the files)
source.include_exts = py,png,jpg,kv,atlas,ttf,json,xml

# (list) List of directory to exclude (let empty to not exclude anything)
source.exclude_dirs = tests, bin, venv,lab, worked, __pycache__, .idea, dist, for-download,laner-linux, .filereader

# (str) Application versioning (method 1)
version = 1.0

# (list) Application requirements
# comma separated e.g. requirements = sqlite3,kivy
requirements = python3,kivy,https://github.com/kivymd/KivyMD/archive/master.zip,android-notify,materialyoucolor,asynckivy,asyncgui,pyjnius,docutils,netifaces,filetype,requests_toolbelt,websockets

# (str) Presplash of the application
presplash.filename = %(source.dir)s/assets/imgs/presplash.png

# (str) Icon of the application
icon.filename = %(source.dir)s/assets/imgs/icon.png

# (list) Supported orientations
# Valid options are: landscape, portrait, portrait-reverse or landscape-reverse
orientation = portrait

# (list) List of service to declare
#services = NAME:ENTRYPOINT_TO_PY,NAME2:ENTRYPOINT2_TO_PY
services = Download:./services/download.py:True,Upload:./services/upload.py:True,Sendnoti:./services/old.py:True

#
# OSX Specific
#

#
author = Fabian © Copyright Info

# change the major version of python used by the app
osx.python_version = 3

# Kivy version to use
osx.kivy_version = 1.9.1

#
# Android specific
#

# (bool) Indicate if the application should be fullscreen or not
fullscreen = 1

# (list) Permissions
# (See https://python-for-android.readthedocs.io/en/latest/buildoptions/#build-options-1 for all the supported syntaxes and properties)
android.permissions = INTERNET, FOREGROUND_SERVICE,POST_NOTIFICATIONS,android.permission.ACCESS_ALL_DOWNLOADS, READ_EXTERNAL_STORAGE, MANAGE_EXTERNAL_STORAGE

# (int) Target Android API, should be as high as possible.
android.api = 35

# each of a resource kind:  drawable, xml, etc...
# android.add_resources = legal_resources
android.add_resources = ./res, ./icons

# (list) Gradle dependencies to add
android.gradle_dependencies = androidx.core:core-ktx:1.15.0, androidx.core:core:1.6.0


# (bool) Enable AndroidX support. Enable when 'android.gradle_dependencies'
# contains an 'androidx' package, or any package from Kotlin source.
# android.enable_androidx requires android.api >= 28
android.enable_androidx = True
# (list) The Android archs to build for, choices: armeabi-v7a, arm64-v8a, x86, x86_64
# In past, was `android.arch` as we weren't supporting builds for multiple archs at the same time.
android.archs = arm64-v8a, armeabi-v7a

# (bool) enables Android auto backup feature (Android API >=23)
android.allow_backup = True

# Alternately, specify the URL and branch of a git checkout:
ios.kivy_ios_url = https://github.com/kivy/kivy-ios
ios.kivy_ios_branch = master

# Another platform dependency: ios-deploy
# Uncomment to use a custom checkout
#ios.ios_deploy_dir = ../ios_deploy
# Or specify URL and branch
ios.ios_deploy_url = https://github.com/phonegap/ios-deploy
ios.ios_deploy_branch = 1.10.0

# (bool) Whether or not to sign the code
ios.codesign.allowed = false

[buildozer]

# (int) Log level (0 = error only, 1 = info, 2 = debug (with command output))
log_level = 2

# (int) Display warning if buildozer is run as root (0 = False, 1 = True)
warn_on_root = 1
