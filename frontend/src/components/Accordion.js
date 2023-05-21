import { Divider } from "antd";
// Initialization for ES Users
import { Collapse, initTE } from "tw-elements";

initTE({ Collapse });

export default function Example({ data = [] }) {
  let totalTime = 0;
  const newData = data ? data.transcription : "";
  const timeArray = newData
    ? newData.map((item, index) => ({
        START: item.START.replace(/:/g, ""),
        END: item.END.replace(/:/g, ""),
        startTime: (
          item.START.replace(/:/g, "").charAt(0) * 600 +
          item.START.replace(/:/g, "").charAt(1) * 60 +
          parseInt(item.START.replace(/:/g, "").slice(-2))
        ).toString(),
        endTime: (
          item.END.replace(/:/g, "").charAt(0) * 600 +
          item.END.replace(/:/g, "").charAt(1) * 60 +
          parseInt(item.END.replace(/:/g, "").slice(-2))
        ).toString(),
      }))
    : "";

  const newTime = timeArray
    ? timeArray.map((item) => ({
        time: item.endTime - item.startTime,
      }))
    : "";

  for (let i = 0; i < newTime.length; i++) {
    totalTime = totalTime + newTime[i].time;
  }
  return (
    <div id="accordionExample" style={{zIndex:100}}>
      <div class="rounded-t-lg  bg-white dark:border-neutral-600 dark:bg-neutral-800">
        <h2 class="mb-0" id="headingOne">
          total talk time : {`${Math.floor(totalTime/60)}`} min {`${totalTime%60}`} second
          <button 
            class="group relative flex w-full items-center rounded-t-[15px] border-0 bg-white px-5  text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white [&:not([data-te-collapse-collapsed])]:bg-white [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&:not([data-te-collapse-collapsed])]:bg-neutral-800 dark:[&:not([data-te-collapse-collapsed])]:text-primary-400 dark:[&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]"
            type="button"
            data-te-collapse-init
            data-te-target="#collapseOne"
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            <div className="bottom-0 left-0 w-full bg-gradient-to-br from-my-from-color to-my-to-color p-3">
              <div className="flex pr-1">
                <div className="flex text-positive-color">
                  Client
                  <Divider
                    type="vertical"
                    style={{ marginLeft: "18px", marginTop: "6px" }}
                  />
                </div>
                <div className="flex w-full h-4 mt-2">
                  {timeArray
                    ? timeArray.map((item, index) => {
                        return (
                          <div
                            key={index}
                            style={{
                              width: `${
                                ((item.endTime - item.startTime) / totalTime) *
                                100
                              }%`,
                            }}
                          >
                            <div
                              className={
                                index % 2 === 0
                                  ? "h-full"
                                  : "h-full bg-gradient-to-br from-client-from-color to-client-to-color"
                              }
                              style={{ width: "100%", height: "50%" }}
                            ></div>
                          </div>
                        );
                      })
                    : ""}
                </div>
              </div>
            </div>
            <span class="ml-auto h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-6 w-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </span>
          </button>
        </h2>
        <div
          id="collapseOne"
          class="!visible"
          data-te-collapse-item
          data-te-collapse-show
          aria-labelledby="headingOne"
          data-te-parent="#accordionExample" 
        >
          <div class="px-5 py-4">
            <h5>Talk Speed</h5>
          </div>
        </div>
      </div>
      <div class="border border-t-0 border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
        <h2 class="mb-0" id="headingTwo">
          <button
            class="group relative flex w-full items-center rounded-none border-0 bg-white px-5 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white [&:not([data-te-collapse-collapsed])]:bg-white [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&:not([data-te-collapse-collapsed])]:bg-neutral-800 dark:[&:not([data-te-collapse-collapsed])]:text-primary-400 dark:[&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]"
            type="button"
            data-te-collapse-init
            data-te-collapse-collapsed
            data-te-target="#collapseTwo"
            aria-expanded="false"
            aria-controls="collapseTwo"
          >
            <div className="bottom-0 left-0 w-full bg-gradient-to-br from-my-from-color to-my-to-color p-3">
              <div className="flex pr-1">
                <div className="flex text-negative-color">
                  Agent
                  <Divider
                    className="ml-4"
                    type="vertical"
                    style={{ marginTop: "6px" }}
                  />
                </div>
                <div className="flex w-full h-4 mt-2">
                  {timeArray
                    ? timeArray.map((item, index) => {
                        return (
                          <div  
                            key={index}
                            style={{
                              width: `${
                                ((item.endTime - item.startTime) / totalTime) *
                                100
                              }%`,
                            }}
                          >
                            <div
                              className={
                                index % 2 === 0
                                  ? "h-full bg-gradient-to-br from-agent-from-color to-agent-to-color"
                                  : "h-full"
                              }
                              style={{ width: "100%", height: "50%" }}
                            ></div>
                          </div>
                        );
                      })
                    : ""}
                </div>
              </div>
            </div>
            <span class="-mr-1 ml-auto h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:mr-0 group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-6 w-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </span>
          </button>
        </h2>
        <div
          id="collapseTwo"
          class="!visible hidden"
          data-te-collapse-item
          aria-labelledby="headingTwo"
          data-te-parent="#accordionExample"
        >
          <div class="px-5 py-4">
            <strong>This is the second item's accordion body.</strong> It is
            hidden by default, until the collapse plugin adds the appropriate
            classes that we use to style each element. These classes control the
            overall appearance, as well as the showing and hiding via CSS
            transitions. You can modify any of this with custom CSS or
            overriding our default variables. It's also worth noting that just
            about any HTML can go within the <code>.accordion-body</code>,
            though the transition does limit overflow.  
          </div>
        </div>
      </div>
      <div class="rounded-b-lg border border-t-0 border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
        <h2 class="accordion-header mb-0" id="headingThree">
          <button
            class="group relative flex w-full items-center border-0 bg-white px-5 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white [&:not([data-te-collapse-collapsed])]:bg-white [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&:not([data-te-collapse-collapsed])]:bg-neutral-800 dark:[&:not([data-te-collapse-collapsed])]:text-primary-400 dark:[&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(75,85,99)] [&[data-te-collapse-collapsed]]:rounded-b-[15px] [&[data-te-collapse-collapsed]]:transition-none"
            type="button"
            data-te-collapse-init
            data-te-collapse-collapsed
            data-te-target="#collapseThree"
            aria-expanded="false"
            aria-controls="collapseThree"
          >
            <div className="bottom-0 left-0 w-full bg-gradient-to-br from-my-from-color to-my-to-color p-3">
              <div className="flex pr-1">
                <div className="flex text-blue-500">
                  Time(s)
                  <Divider type="vertical" style={{ marginTop: "6px" }} />
                </div>
                <div className="flex w-full items-center">
                  <div className="text-ts"></div>
                  {timeArray
                    ? timeArray.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="flex"
                            style={{
                              width: `${
                                ((item.endTime - item.startTime) / totalTime) *
                                100
                              }%`,
                            }}
                          >
                            <div style={{ width: "100%" }}></div>
                            <div className="h-full text-ts">
                              {index % 2 === 0
                                ? `${item.END.charAt(0)}${item.END.charAt(
                                    1
                                  )}:${item.END.slice(-2)}`
                                : ""}
                            </div>
                          </div>
                        );
                      })
                    : ""}
                </div>
              </div>
            </div>
            <span class="-mr-1 ml-auto h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:mr-0 group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-6 w-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </span>
          </button>
        </h2>
        <div
          id="collapseThree"
          class="!visible hidden"
          data-te-collapse-item
          aria-labelledby="headingThree"
          data-te-parent="#accordionExample"
        >
          {/* <div class="px-5 py-4">
        
      </div> */}
        </div>
      </div>
    </div>
  );
}
