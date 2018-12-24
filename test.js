const getArr = require('./index')
const {fetchUrls, results} = require('./helperFunction')

describe('test for code challenge', () => {
  it('gets a bad or no response for a known bad url', async () => {
    const badUrl = `https://servedby.flashtalking.com/imp/4/46838;1205845;201;pixel;ClearTrade;ClearTradeNativeTabletBlogSandalShop1x1/?cachebuster=[CACHEBUSTER]"/>`
      await fetchUrls({url: badUrl})
      .then(res => {
        expect(res.status).not.toEqual('ok')
      })
      .catch(e => {
        console.log(e)
        expect(true).toEqual(false)
      })
  });

  it('gets a good or no response from a known good url', async () => {
      const goodUrl = `https://d.xp1.ru4.com/tad?_o=42032312&_t=dfa_%epid!&ssv_mmuid=%pmmuid=!;&ssv_mmaid=%pmm
      aid=!;&ssv_mmsid=%pmmsid=!;`
      await fetchUrls({url: goodUrl})
      .then(res => {
        expect(res.status).not.toEqual(404)
      })
      .catch(e => {
        expect(true).toEqual(false)
      })
  });


  it('checks if function sorts all the objects into fail and success arrays', async () => {
    const goodRequestObj1 = { tacticId: '331452',
      url: `https://d.xp1.ru4.com/tad?_o=42032312&_t=dfa_%epid!&ssv_mmuid=%pmmuid=!;&ssv_mmaid=%pmm
  aid=!;&ssv_mmsid=%pmmsid=!;`}
    const goodRequestObj2 = { tacticId: '329337',
      url:
       `https://tag.researchnow.com/t/beacon?pr=7721&ca=9088505&pl=124414329&cr=&si=Triplelift&
  adn=3&tt=3&a=1`}
    const goodRequestObj3 = { tacticId: '336987',
      url: 'http://tags.bluekai.com/site/33167?limit=1'}
    const badRequestObj = { tacticId: '339955',
      url: 'https://log.dmtry.com/redir/1/2495/3850/1248593/0/1/160/0/971/1.ver?at=i&d=PxImp&img=1'}
    const obj = [goodRequestObj1, goodRequestObj2, goodRequestObj3, badRequestObj]
      await results(obj)
      .then(res => {
        expect(res.length).toEqual(1)
      })
      .catch(e => {
        expect(true).toEqual(false)
      })
  });


  it('checks if impression_pixel_json is valid', () => {
      const badJsonObj = { id: '19286',
      tactic_id: '334415',
      creative_library_id: '12461',
      creative_asset_id: '31841',
      active: '1',
      deleted: '0',
      click_tracker_url: 'NULL',
      click_tracker_encoding_level: '0',
      impression_pixel_json: 'NULL',
      js_pixel_json: 'NULL',
      clickthrough_pixel_json: 'NULL',
      viewability_pixel_json: 'NULL',
      last_modified: '2/9/16 16:33' }

      const goodJsonObj = { id: '4002',
      tactic_id: '326479',
      creative_library_id: '5832',
      creative_asset_id: '10890',
      active: '1',
      deleted: '0',
      click_tracker_url:
       'http://insight.adsrvr.org/track/clk?ttd_r=${__TTD_CLK__}&r=',
      click_tracker_encoding_level: '0',
      impression_pixel_json:
       `["https:\\/\\/ad.doubleclick.net\\/ddm\\/ad\\/N2434.291508.ACCUENMEDIA.COM\\/B8937013.1
  20966574;sz=1x1;ord=[timestamp]?"]`,
      js_pixel_json: 'NULL',
      clickthrough_pixel_json: 'NULL',
      viewability_pixel_json: 'NULL',
      last_modified: '9/3/15 14:54' }
      const result = getArr([badJsonObj, goodJsonObj])
      expect(result.length).toEqual(1)
  })
  global.console = {
        log: jest.fn()
    }

})
