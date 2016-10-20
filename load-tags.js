import { EJSON } from "meteor/ejson";
import { Shops } from "/lib/collections";
import { Hooks, Logger, Reaction } from "/server/api";
import { Fixture } from "/server/api/core/import";
export default function () {
  /**
   * Hook to setup core additional imports during Reaction init (shops process first)
   */
  Hooks.Events.add("onCoreInit", () => {
    Logger.info("Load default data from /private/data");

    // try {
    //   Fixture.process(Assets.getText("custom/testTag.json"), ["name"], Reaction.Import.load);
    // } catch (error) {
    //   Logger.info("Bypassing loading Tags default data, Katie.");
    // }

    const taggyFile = Assets.getText("data/custom/Tags.json");
    const tagFile = EJSON.parse(taggyFile, true);

    console.log("here's a tagfile:", tagFile);

    for ( const tag of tagFile)
  { console.log(tag.name);
   newTagId = Meteor.call("shop/createTag", tag.name, !tag._id);
    // const matchProducts = Products.find({$in:{hashtags: tag._id}});
    // Product.update({_id: matchProducts._id}, {$addToSet:{hashtags:newTagId}})
  }

    // try {
    //   Reaction.Import.process(Assets.getText("data/Shops.json"), ["name"], Reaction.Import.shop);
    //   // ensure Shops are loaded first.
    //   Reaction.Import.flush(Shops);
    // } catch (error) {
    //   Logger.info("Bypassing loading Shop default data");
    // }
    //
    // try {
    //   Fixture.process(Assets.getText("data/Shipping.json"), ["name"], Reaction.Import.shipping);
    // } catch (error) {
    //   Logger.info("Bypassing loading Shipping default data.");
    // }
    //
    // try {
    //   Fixture.process(Assets.getText("data/Products.json"), ["title"], Reaction.Import.load);
    // } catch (error) {
    //   Logger.info("Bypassing loading Products default data.");
    // }
    //
    // try {
    //   Fixture.process(Assets.getText("data/Tags.json"), ["name"], Reaction.Import.load);
    // } catch (error) {
    //   Logger.info("Bypassing loading Tags default data.");
    // }
    //
    // these will flush and import with the rest of the imports from core init.
    // but Bulk.find.upsert() = false
    //
    Fixture.flush();
  });
}
