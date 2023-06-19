import { Divider } from "antd";
import { useEffect, useState } from "react";
import {
  FaPlayCircle,
  FaPauseCircle,
  FaAngleDown,
  FaAngleUp,
} from "react-icons/fa";
// Initialization for ES Users
// import { Collapse, initTE } from "tw-elements";

// initTE({ Collapse });

export default function Example({ data = [] }) {
  // console.log("Accordion",data);
  const [collapse, setCollapse] = useState(0);
  let totalTime = 0;
  let time1 = 0;
  let time2 = 0;
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

  for (let i = 0; i < newTime?newTime.length:0; i++) {
    totalTime = totalTime + newTime[i].time;
  }
  const differenceTime = (startTimestamp, endTimestamp) => {
    // Convert start timestamp to seconds
    const startParts = startTimestamp.split(":");
    const startMinutes = parseInt(startParts[0]);
    const startSeconds = parseInt(startParts[1]);
    const startTotalSeconds = startMinutes * 60 + startSeconds;

    // Convert end timestamp to seconds
    const endParts = endTimestamp.split(":");
    const endMinutes = parseInt(endParts[0]);
    const endSeconds = parseInt(endParts[1]);
    const endTotalSeconds = endMinutes * 60 + endSeconds;

    // Calculate the time difference in seconds
    const timeDifference = endTotalSeconds - startTotalSeconds;
    return timeDifference;
    // console.log("Time difference in seconds:", timeDifference);
  };
  const numWords = (text) => {
    // Split the text into words using space as the delimiter
    const words = text.split(" ");

    // Get the number of words
    const wordCount = words.length;
    return wordCount;
    // console.log("Number of words:", wordCount);
  };
  let talkwords1 = 0;
  let talkwords2 = 0;
  for (let i = 0; i < data?data.transcription.length:0; i++) {
    if (i % 2 == 0) {
      time1 =
        time1 +
        differenceTime(data.transcription[i].START, data.transcription[i].END);
      talkwords1 = talkwords1 + numWords(data.transcription[i].TEXT);
    } else {
      time2 =
        time2 +
        differenceTime(data.transcription[i].START, data.transcription[i].END);
      talkwords2 = talkwords2 + numWords(data.transcription[i].TEXT);
    }
  }
  const talkspeed = (talkTimeSeconds, talkWords) => {
    // Convert talk time from seconds to minutes
    const talkTimeMinutes = talkTimeSeconds / 60;

    // Calculate talk speed (words per minute)
    const talkSpeed = talkWords / talkTimeMinutes;

    console.log("Talk Speed:", talkSpeed.toFixed(2), "wpm");
    return talkSpeed.toFixed(2);
  };
  const handleClickHeading = (headingID) => {
    if (headingID == collapse) setCollapse(0);
    else setCollapse(headingID);
    // setCnt(cnt+1);
    // setCnt(cnt+1);
    // setCnt((prevCnt) => prevCnt + 1);
    // setCnt((prevCnt) => prevCnt + 1);
    // setCnt((prevCnt) => prevCnt + 1);
    // setCnt(cnt+1);
  };

  return (
    <div id="accordionExample" style={{ zIndex: 100 }} className="bg-white">
      <p className="text-end px-10 py-1 border-b border-t border-gray-300">
        {/* <div>{cnt}</div> */}
        Total Talk Time : {`${Math.floor(totalTime / 60)}`} min{" "}
        {`${totalTime % 60}`} second
      </p>
      <div class="rounded-t-lg bg-white dark:border-neutral-600 dark:bg-neutral-800">
        <div
          class="mb-0 flex flex-row px-5 py-2 items-center gap-1"
          id="headingOne"
          onClick={() => handleClickHeading(1)}
        >
          {collapse == 1 && (
            <FaPauseCircle
              className="w-4 h-4"
              style={{ margin: 0, fill: "#00539d" }}
            />
          )}
          {collapse != 1 && (
            <FaPlayCircle
              className="w-4 h-4"
              style={{ margin: 0, fill: "#00539d" }}
            />
          )}

          <div className="bottom-0 left-0 w-full">
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
                            style={{ width: "100%", height: "35%" }}
                          ></div>
                        </div>
                      );
                    })
                  : ""}
              </div>
            </div>
          </div>
          {collapse == 1 && <FaAngleUp className="w-5 h-5" />}
          {collapse != 1 && <FaAngleDown className="w-5 h-5" />}
        </div>
        {collapse == 1 && (
          <div id="collapseOne">
            <div class="flex flex-row px-5 py-4">
              <div className="w-1/3 text-center">
                <h1 className="text-xl">Talk Time</h1>
                <div className="text-2xl text-yellow-500">
                  <span className="mr-1">{time1}</span>seconds
                </div>
              </div>
              <div className="w-1/3 text-center">
                <h1 className="text-xl">Talk Words</h1>
                <div className="text-2xl text-green-500">
                  <span className="mr-1">{talkwords1}</span>words
                </div>
              </div>
              <div className="w-1/3 text-center">
                <h1 className="text-xl">Talk Speed</h1>
                <div className="text-2xl text-red-500">
                  <span className="mr-1">{talkspeed(time1,talkwords1)}</span>wpm
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div class="bg-white">
        <div
          class="mb-0 flex flex-row px-5 py-2 items-center gap-1"
          id="headingTwo"
          onClick={() => handleClickHeading(2)}
        >
          {collapse == 2 && (
            <FaPauseCircle
              className="w-4 h-4"
              style={{ margin: 0, fill: "#00539d" }}
            />
          )}
          {collapse != 2 && (
            <FaPlayCircle
              className="w-4 h-4"
              style={{ margin: 0, fill: "#00539d" }}
            />
          )}
          <div className="bottom-0 left-0 w-full">
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
                            style={{ width: "100%", height: "35%" }}
                          ></div>
                        </div>
                      );
                    })
                  : ""}
              </div>
            </div>
          </div>
          {collapse == 2 && <FaAngleUp className="w-5 h-5" />}
          {collapse != 2 && <FaAngleDown className="w-5 h-5" />}
        </div>
        {collapse == 2 && (
          <div id="collapseTwo">
            <div class="flex flex-row px-5 py-4">
              <div className="w-1/3 text-center">
                <h1 className="text-xl">Talk Time</h1>
                <div className="text-2xl text-yellow-500">
                  <span className="mr-1">{time2}</span>seconds
                </div>
              </div>
              <div className="w-1/3 text-center">
                <h1 className="text-xl">Talk Words</h1>
                <div className="text-2xl text-green-500">
                  <span className="mr-1">{talkwords2}</span>words
                </div>
              </div>
              <div className="w-1/3 text-center">
                <h1 className="text-xl">Talk Speed</h1>
                <div className="text-2xl text-red-500">
                  <span className="mr-1">{talkspeed(time2,talkwords2)}</span>wpm
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div class="bg-white border-t border-gray-300">
        <div class="accordion-header mb-0 px-5" id="headingThree">
          <div className="bottom-0 left-0 w-full">
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
        </div>
      </div>
    </div>
  );
}
