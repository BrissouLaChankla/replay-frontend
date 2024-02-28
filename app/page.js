"use client"
import Image from "next/image";
import Modal from "@/components/Modal";
import Video from "@/components/Video";

import SkeletonVideo from "@/components/SkeletonVideo";
import Anime from "@/components/Anime";

import { useState, useEffect } from "react";


export default function Home() {

  const [nbOfFetch, setNbOfFetch] = useState(0);
  const [videos, setVideos] = useState([]);
  const [tags, setTags] = useState([]);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hideLoadMore, setHideLoadMore] = useState(false);
  const [filters, setFilters] = useState({ players: [], tags: [] });


  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/playerNTags`)
      .then(response => response.json())
      .then(data => {
        setTags(data.tags);
        setPlayers(data.players);
      });

  }, [])


  useEffect(() => {

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/latest/${nbOfFetch}`)
      .then(response => response.json())
      .then(data => {
        setVideos([...videos, ...data.videos]);
        setLoading(false);
        if (data.lastFetch) {
          setHideLoadMore(true);
        }
      })

  }, [nbOfFetch])

  const finishToAddVideo = (videoJustAdded) => {
    setVideos(videosPrec => [videoJustAdded, ...videosPrec]);
  }

  let showMore = ""
  if (!hideLoadMore) {
    if (loading) {
      showMore = <button className="btn btn-primary w-32" disabled>
        <span className="loading loading-ring loading-xs"></span>
      </button>
    } else {
      showMore = <button className="btn btn-primary w-32" onClick={() => loadMore()}>
        Charger +
      </button>
    }
  } else {
    showMore = <span>Il n'y a pas d'autres vidéos...</span>
  }





  const handleFilter = (e) => {

  }

  const loadMore = () => {
    setLoading(true);
    setNbOfFetch(prevCount => prevCount + 1);
  }

  const videosComp = videos.map((data, i) => <Video key={i} {...data} />);


  return (
    <div>
      <header className="relative h-[50vh] pb-12 overflow-hidden">
        {
          !!videos.length &&
          <video autoPlay loop muted className="absolute -z-10 w-full -top-1/2 " style={{ filter: "brightness(0.5)" }}>
            <source src={videos[0].src} type="video/mp4" />Your browser does not support the video tag.
          </video>
        }
        <div className="flex flex-col h-full items-start justify-center gap-5 max-w-7xl m-auto ">
          <div className="flex items-center gap-3">

            <h1 className="text-white drop-shadow-[0_3px_1.2px_rgba(0,0,0,0.8)]">RePlay </h1><Anime />
          </div>
          <p className="text-white max-w-sm drop-shadow-[0_3px_1.2px_rgba(0,0,0,0.8)]">Pour ne jamais oublier les moments où Skander nous a dit qu'il allait 1v9...</p>
          <button className="btn text-white drop-shadow-[0_3px_1.2px_rgba(0,0,0,0.8)]" onClick={() => document.getElementById('my_modal_2').showModal()}>Upload une vidéo</button>
        </div>
      </header>
      <div className="relative">
        <svg style={{
          display: "block",
          position: "absolute",
          left: 0,
          bottom: "-1px",
          width: "100%",
          transform: "translateY(-100%)",
          top: 0,
          height: "auto",
        }} viewBox="0 0 1920 60" aria-hidden="true"><path data-theme="softSecondary" fill="#1d232a" d="M0,80.75H1920V45.833H1742.083a80.491,80.491,0,0,1,12.863-1.55c5.2-.26,17.24-.3,24.153-.24,26.69.222,54.377,1.094,79.341.96,19.287-.1,37.1-.372,53.573-.788L1920,44V34.078l-6.614.216-9.221.256c-6.252.147-12.7.249-19.265.32-13.132.14-26.739.15-40.206.125-26.935-.052-53.313-.247-74.22.168-14.367-1.4-32.582-.756-48.293-1.92-10.145.509-20.876.936-24.149,2.4-16.09-.266-37.611,2.532-50.019.479V34.684c-10.959-2.291-33.371-1.869-48.292-3.84-15.861-.512-26.214,1.347-39.671,1.92-7.032.178-5.941-.773-13.8-.481-40.751-.071-41.131,5.477-62.087,8.16-4.569-5.691-47.085-5.126-77.622-5.04-2.333-4.154-22.643-5.808-50.015-6.479-4.677-2.069-17.763-2.969-22.423-5.04-4.7-.175-3.474.477-6.9.479-11.485-2.964-40.092-2.449-63.813-3.36-23.312.6-29.4,3.589-55.195,3.841-8.3-3.783-56.5-4.561-84.513-3.361-.316-1.857-5.682-3.862-20.7-4.8-2.193-.137-6.78.122-10.352,0-16.331-.564-22.974-3.145-39.671-1.441-22.812-1.938-73.831-3.919-98.311-.719-4.315-2.2-15.369-3.462-20.7-5.521-23.122-.714-41.26-2.815-65.54-2.64-13.5,1-29.918,1.6-39.671,3.12.27,1.317-1.305,2.38-6.9,2.88-35.562-1.333-83.117-2.545-93.139,2.88-14.338-.314-8.341,2.2-22.423,1.92-5.17-.16-2.615-1.4-6.9-1.68-36.327-1.894-80.653-1.762-100.041,2.161-12.433-1.631-21.648-3.708-36.221-5.04-13.359.1-36.33-.325-48.293-1.2-32.483.6-42.463,4.331-53.471,7.92-25.227-.147-43.752,2.274-58.641,4.321-11.966-1.189-27.56-.426-39.67-1.441-19.514,1.284-40.772,2.328-53.468,4.561C301.584,31.04,294,33.888,283.7,37.8c-15.047-.774-19.865-3.5-36.221-4.321-10.453-.522-37.12-1.01-48.3-.959-10.184.046-17.188,1.062-27.595.719-18.244,2.022-31.516,4.736-46.57,7.2-3.726,2.091-9.8,3.854-17.5,5.39H4.061c-.734-1.281-1.512-2.592-2.344-3.949-.546-.09-1.13-.175-1.717-.26Z" /></svg>
      </div>

      <div className="max-w-7xl m-auto pt-16 pb-5">
        <div className="grid grid-cols-12">
          <div className="col-span-12 md:col-span-4">
            <h2>Joueurs</h2>

            <div className="flex flex-wrap gap-3 pt-3" >

              {
                !!players.length ?
                  players.map((player, i) =>
                    <div key={i}>
                      <input type="checkbox" id={player.name} className="peer hidden" />
                      <label htmlFor={player.name} className="select-none cursor-pointer btn btn-outline btn-sm peer-checked:bg-white peer-checked:text-black">{player.name}</label>
                    </div>
                  )
                  :
                  [...Array(8)].map((e, i) =>
                    <div className="skeleton w-16 rounded-lg h-7 border-[0.5px] btn-outline"></div>
                  )

              }
            </div>
          </div>
          <div className="col-span-12 md:col-span-4">
            <h2>Tags</h2>
            <div className="flex flex-wrap gap-3 pt-3">
              {
                !!tags.length ?
                  tags.map((tag, i) =>
                    <div key={i}>
                      <input type="checkbox" id={tag.name} className="peer hidden" />
                      <label htmlFor={tag.name} className="select-none cursor-pointer btn btn-outline btn-sm peer-checked:bg-white peer-checked:text-black">{tag.name}</label>
                    </div>
                  ) :
                  [...Array(5)].map((e, i) =>
                    <div className="skeleton w-16 rounded-lg h-7 border-[0.5px] btn-outline"></div>
                  )
              }

            </div>

          </div>
          <div className="col-span-12 md:col-span-4">
            <h2>Tri</h2>

          </div>
        </div>
        <div className="grid grid-cols-12 gap-8 mt-8">
          {
            !!videos.length ?
              videosComp
              :
              [...Array(6)].map((e, i) =>
                <SkeletonVideo key={i} />
              )

          }
        </div>

        <div className="text-center mt-16">
          {showMore}
        </div>
      </div>

      <Modal players={players} tags={tags} finishToAddVideo={finishToAddVideo} />
    </div>
  );
}
