
function timeoutExperiments() {
  const wasteTime = async (res) => {
    for (let i = 0; i < 100000000; i++) 1+1;
    res("done");
  }

  // console.time("wasteTime");
  // wasteTime();
  // console.timeEnd("wasteTime");

          // const p1 = new Promise((res) => {
  //   dispatch("RUN");
  //   console.log("finished")
  //   res("p1");
  // });

  // const p1 = addTimeout(() => {
  //   wasteTime();
  //   return "p1";
  // }, 100);


  // const result = await Promise.race([p1, p2]);

  // const result = await addTimeout(() => {
  //   wasteTime();
  // }, 100)

  // console.log(result);

  const addTimeout = (fn, ms) => new Promise(async (res) => {
    new Promise(fn).then(() => res(true));
    setTimeout(() => res(false), ms);
  });

  const result = new Promise((resolve, reject) => {
    wasteTime(resolve);
    setTimeout(_ => reject('timeout'), 100);
  });

  console.log(result);
}

