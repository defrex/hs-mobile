PhoneGap iPhone
=============================================================
PhoneGapLib is a static library that enables users to include PhoneGap in their iPhone application projects easily, and also create new PhoneGap based iPhone application projects through a Xcode project template.

Pre-requisites
-------------------------------------------------------------
Make sure you have installed the latest iPhone SDK. Download at [http://developer.apple.com/iphone](http://developer.apple.com/iphone)

Build and install the Installer Package
-------------------------------------------------------------
1. Launch "Terminal.app"
2. Navigate to the folder where Makefile is (this folder)
3. Type in "make" then press Enter

The installer should build "PhoneGapLibInstaller.pkg" into this folder.
Launch "PhoneGapLibInstaller.pkg" to install PhoneGapLib and the 
PhoneGap Xcode Template.

Create a PhoneGap project
-------------------------------------------------------------

1. Launch Xcode, then under the File menu, select "New Project...".
2. Navigate to the "User Templates" section, select PhoneGap, then in the right pane, select "PhoneGap-based Application"
3. Select the "Choose..." button, name your project and choose the location where you want the new project to be.
4. Modify the contents of the "www" directory to add your HTML, CSS and Javascript.

Uninstalling PhoneGapLib and the Xcode Template
-------------------------------------------------------------
1. Launch "Terminal.app"
2. Navigate to the folder where Makefile is (this folder)
3. Type in "make uninstall" then press Enter

NOTE: It will ask you to confirm whether you want to delete the installed PhoneGapLib directory (just in case you made changes there). It will not ask for confirmation in deleting the installed Xcode template.


Installer Notes
-------------------------------------------------------------
This installer will only install items under your home folder (signified by ~)

Items that will be installed:

1. Xcode global var in ~/Library/Preferences/com.apple.Xcode.plist (which will be listed under Xcode Preferences -> Source Trees)
2. PhoneGapLib Xcode static library project under ~/Documents/PhoneGapLib
3. Xcode project template in ~/Library/Application Support/Developer/Shared/Xcode/Project Templates/PhoneGap

To uninstall:

1. Remove the PHONEGAPLIB value in Xcode Preferences -> Source Trees
2. Delete the ~/Documents/PhoneGapLib folder
3. Delete the ~/Library/Application Support/Developer/Shared/Xcode/Project Templates/PhoneGap folder

PhoneGapLib Tests
-------------------------------------------------------------
There is a Xcode project that will test PhoneGapLib according to the mobile spec. There is some setup needed before the project can be run. You will also need git installed and in your path.

Set up the test project:

1. Launch "Terminal.app"
2. Type in "chmod 755 update_test.sh"
3. Type in "./update_test.sh"

This will get the mobile-spec submodule and install it under the PhoneGapLibTests folder. You can then build and run the PhoneGapLibTest project to see the results.

You should run step (3) again before running any tests, to get the updated mobile-spec.

FAQ
---
Q. PhoneGapLib.xcodeproj is red in my PhoneGap-based application and I get build errors?

A. The Xcode variable for PhoneGapLib is not set. Xcode must be closed when the installer is running. Either run the installer again, or add a PHONEGAPLIB variable in Xcode Preferences --> Source Trees, with the location of PhoneGapLib. The installer would have installed it in ~/Documents/PhoneGapLib.

Q. What is this warning I get when I am packaging the installer? "Warning: "Require Admin Authorization" is recommended but not enabled. Installation may fail."

A. You can safely ignore this warning, it will not affect installation. The installer only installs for the current user, thus it does not need Admin privileges.

Q. I get this "Invalid architecture" error. How do I fix it?

A. The Active SDK for the project is set to "Use Base SDK", change it to one of the iPhone targets in the drop-down. Unfortunately this is a user-specific project setting and cannot be set in the Xcode template. 

Q. I get this "_kUTTypeImage" link error. How do I fix it?

A. This relates to framework added for the new UIImagePickerController delegate. Add "MobileCoreServices.framework" to your project. This only relates to pre-existing projects that have updated their PhoneGapLib. New projects should not see this error.


BUGS?
-----
File them at [http://phonegap.lighthouseapp.com](http://phonegap.lighthouseapp.com/projects/20116-iphone)

