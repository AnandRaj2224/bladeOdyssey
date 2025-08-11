export default {
  isPlayingAnims(animsKey) {
    if (!this.anims || typeof this.anims.getCurrentKey !== 'function') {
      return false;
    }
    return this.anims.isPlaying && this.anims.getCurrentKey() === animsKey;
  },
};
