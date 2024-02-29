"use client"
import { useRef, useState } from "react"

export default function Modal({ players, tags, finishToAddVideo }) {
    const closebtn = useRef(null);

    // Sert à gérer de façon local les tags et les players de la vidéo qui vient d'être upload vue que c'est des clées étrangères
    const [tagsUploaded, setTagsUploaded] = useState([]);
    const [playersUploaded, setPlayersUploaded] = useState([]);
    const [loading, setLoading] = useState(false);


    const ToggleUploadedTP = (type, value) => {
        if (type === "tags") {
            setTagsUploaded(tagsUploaded.includes(value)
                ? tagsUploaded.filter(e => e !== value)
                : [...tagsUploaded, value]);
        } else if (type === "players") {
            setPlayersUploaded(playersUploaded.includes(value)
                ? playersUploaded.filter(e => e !== value)
                : [...playersUploaded, value]);
        }
    }

    async function onSubmit(event) {
        setLoading(true);
        event.preventDefault()

        const formData = new FormData()
        // Accéder à l'input type file utilisant son nom
        const inputFile = event.currentTarget.elements['uploaded_file'];

        // Obtenir le fichier
        const file = inputFile.files[0];
        const fetchurl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/upload`;
        formData.append('upload_preset', "hzd5j2fc");
        formData.append('file', file);

        const uploadCloudinary = await fetch(fetchurl, {
            method: 'POST',
            body: formData,
        })

        const cloudinaryData = await uploadCloudinary.json();

        const imgUrl = cloudinaryData.secure_url;
        console.log("Upload sur cloudinary fait, lien  : " +imgUrl)

        const fd = new FormData(event.target)
        fd.append('imgUrl', imgUrl);

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/store`, {
            method: 'POST',
            body: fd,
        })

        const data = await response.json();
        
      
        data.newVid.tags = tagsUploaded;
        data.newVid.players = playersUploaded;

        finishToAddVideo(data.newVid);
        // Clean inputs
        event.target.reset();

        setLoading(false)

        // Close modal
        closebtn.current.click();
    }


    return (
        <dialog id="my_modal_2" className="modal">
            <div className="modal-box w-11/12 max-w-5xl flex flex-col" >

                <form method="dialog" >
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" ref={closebtn}>✕</button>
                </form>
                <h2 className="text-3xl">Ajouter une vidéo</h2>
                <form encType="multipart/form-data" method="post" onSubmit={onSubmit}>
                    <input type="text" name="title" required placeholder="Petit titre en fast ?" className="input input-bordered w-full max-w-sm mt-6" />
                    <input type="file" accept="video/*" required className="file-input file-input-bordered file-input-primary w-full mt-3 h-32" name="uploaded_file" />
                    <div className="flex gap-6 mt-4">
                        <div className="w-3/6">
                            <h3 className="text-xl">Joueurs</h3>
                            <div className="flex flex-wrap gap-2 pt-3">
                                {
                                    players.map((player, i) =>
                                        <div key={i}>
                                            <input type="checkbox" onChange={() => ToggleUploadedTP("players", { _id: player._id, name: player.name })} id={`select_${player.name}`} name={`player_${player._id}`} className="peer hidden" />
                                            <label htmlFor={`select_${player.name}`} className="select-none cursor-pointer btn btn-outline btn-sm peer-checked:bg-white peer-checked:text-black">{player.name}</label>
                                        </div>
                                    )}
                            </div>
                        </div>
                        <div className="w-2/6">
                            <h3 className="text-xl">Tags</h3>
                            <div className="flex flex-wrap gap-2 pt-3">
                                {
                                    tags.map((tag, i) =>
                                        <div key={i}>
                                            <input type="checkbox" onChange={() => ToggleUploadedTP("tags", { _id: tag._id, name: tag.name })} id={`select_${tag.name}`} name={`tag_${tag._id}`} className="peer hidden" />
                                            <label htmlFor={`select_${tag.name}`} className="select-none cursor-pointer btn btn-outline btn-sm peer-checked:bg-white peer-checked:text-black">{tag.name}</label>
                                        </div>
                                    )}
                            </div>
                        </div>

                        <button type="submit" disabled={loading ? true : false} className={`${loading ? "btn-disabled" : ""} bg-primary rounded cursor-pointer text-white w-1/6`}>
                            {loading ? <span className="loading loading-ring loading-sm"></span> : "Envoyer"}
                        </button>
                    </div>
                </form>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>

    )
}
