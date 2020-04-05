<script>
	const arts = fetch('http://localhost:1234/products')
	    .then((res) => res.json())
	    .then((data) => data)
	    .catch((err) => console.error(err));
</script>

<main>
    <div class="arts">
        {#await arts}
        <p>...waiting</p>
        {:then data}
            {#each data as art}
                <div class="art">
                    <figure>
                        <img class="art__preview" src={art.img} alt={art.tags.join(',')}/>
                        <figcaption class="art__description">{art.description}</figcaption>
                    </figure>
                </div>
            {/each}
        {:catch error}
            <p style="color: red">{error.message}</p>
        {/await}
    </div>
</main>

<style>
    .arts{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }

    .art__preview{
        width: 300px;
    }

    .art__description{
        width: 300px;
    }
</style>