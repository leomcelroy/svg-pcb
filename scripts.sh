if [ $1 == "run" ]; then
  deno run --allow-net --allow-read server.js
elif [ $1 == "bundle" ]; then
  echo "Bundle it."
else
  echo "Command not recognized."
fi