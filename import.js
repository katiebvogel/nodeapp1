import { Shops } from "/lib/collections";
import { Hooks, Logger, Reaction } from "/server/api";
import { Fixture } from "/server/api/core/import";
// here we import our collection connections.
import { Tags, Products } from "/lib/collections";

export default function () {
  /**
   * Hook to setup core additional imports during Reaction init (shops process first)
   */
  Hooks.Events.add("onCoreInit", () => {
    Logger.info("Load default data from /private/custom");

    // we could do this, but you can also import from your own version Tag data.

    // try {
    //   Fixture.process(Assets.getText("data/custom/Tags.json"), ["name"], Reaction.Import.load);
    // } catch (error) {
    //   Logger.info("Bypassing loading Tags default data.");
    // }


    // this is how we import a custom json (just gives you a EJSON.parse object)

    const tagFile = Assets.getText("custom/Tags.json");
    console.log(tagFile);


    for (tag of tagFile)
      //
      // loop through products and import, or update already imported products
      // where the new tags old Id was already import, and update old Id to this new ID
      // if this tags is in product.hashtags
      //
      // for example, YMMV
      newTagId = Meteor.call("shop/createTag", tag.name, !tag._id);
      const matchProducts = Products.find({$in:{hashtags: tag._id}});
      Product.update({_id: matchProducts._id}, {$addToSet:{hashtags:newTagId}})
      //
    }

    // not needed if you are writing direct, but this commits imports to the db.
    // Fixture.flush();
  });
}
