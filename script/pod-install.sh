# rm -rf ~/Library/Developer/Xcode/DerivedData/*

cd ios/App

# rm -rf Pods
# rm -rf Podfile
# rm -rf Podfile.lock

pod deintegrate
pod install --repo-update

open App.xcworkspace
