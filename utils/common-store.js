import { lyricStore } from '../store/index'

export function isPlay(isPlaying, _this) {
  console.log('isPlaying', isPlaying);
  lyricStore.dispatch("isPlayer", isPlaying)
  lyricStore.onStates(["isPlaying"], ({
    isPlaying
  }) => {
    // isPlaying 为 false 条件不成立
    if (isPlaying !== undefined) {
      _this.setData({
        isPlaying,
        pauseWidthplay: isPlaying ? 'pause' : 'play'
      })
    }
  })
}