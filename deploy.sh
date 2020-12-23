# Run with gitbash or shell
# Build web application
yarn build

# Move to dist folder
cd dist

# Copy file index.html to 200.html
cp index.html 200.html

# Deploy to surge
npx surge . tamnguyen02121993-music-app.surge.sh