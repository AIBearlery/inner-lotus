# assets/audio

Recorded meditation narration goes here.

Record the six scripts in `docs/meditation-scripts.md` and save each with the **exact**
filename below, then uncomment its line in `src/content/audioSources.ts`. That's the only
step — the app is already wired to play them (eyes closed, even when the phone is on silent).

| Session | Filename |
|---|---|
| Wake the Body | `wake-the-body.m4a` |
| Spark | `spark.m4a` |
| Clear the Lens | `clear-the-lens.m4a` |
| Open with Warmth | `open-with-warmth.m4a` |
| Set the Day | `set-the-day.m4a` |
| Steady the Storm | `steady-the-storm.m4a` |

`.m4a` is what an iPhone's Voice Memos app produces by default; `.mp3` or `.wav` also work
(just match the extension in `audioSources.ts`). Until a file is added, that session plays a
gentle guided-breathing placeholder so the flow still works.
