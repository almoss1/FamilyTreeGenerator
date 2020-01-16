const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MemberSchema = new Schema({
    phone: { type: Number, required: true },
    name: { type: String, required: true },
    moms_number: { type: Number },
    mom: { type: Schema.Types.ObjectId, ref: 'member', required: false },
    dads_number: { type: Number },
    dad: { type: Schema.Types.ObjectId, ref: 'member', required: false },
    age: { type: Number },
    childrens_numbers: [{ type: Number }],
    children: [{ type: Schema.Types.ObjectId, ref: 'member' }],
});

MemberSchema.pre('save', async function () {
    // Ensure no dupes
    const peopleWithThisNumber = await this.constructor.find({ phone: this.phone });
    if (peopleWithThisNumber.count > 0) {
        throw new Error(`A member with this phone number already exists (${peopleWithThisNumber[0].name})`);
    }
    // Moms number
    // -> Check if a member with this number exists
    //      add this._id to mom's children[] field
    const possiblyMyMom = await this.constructor.findOne({ phone: this.moms_number });
    console.log("Mom already registered?", possiblyMyMom);
    if (possiblyMyMom) {
        possiblyMyMom.children.unshift(this._id);
        await possiblyMyMom.save();
        this.mom = possiblyMyMom;
    }

    // Dads number
    // -> Check if a member with this number exists
    //      add this._id to dad's children[] field
    const possiblyMyDad = await this.constructor.findOne({ phone: this.dads_number }, (err, doc) => {
        console.log("DOCUMENT:", doc);
    });
    console.log("Dad registered?", possiblyMyDad);
    if (possiblyMyDad) {
        possiblyMyDad.children.unshift(this._id);
        await possiblyMyDad.save();
        this.dad = possiblyMyDad;
    }
    // Childrens numbers
    // For each child:
    // -> Check if a member with this number exists
    //    compare this.number with child.moms_number & child.dads_number
    //      depending on if this is the mom or the dad,
    //          set child.(mom or dad) to be this._id
    //    add this._id to children
    for (let childsNumber in this.childrens_numbers) {
        const foundChild = await Member.findOne({ phone: childsNumber });
        if (foundChild) {
            this.children.unshift(foundChild._id);
            if (this.phone === foundChild.moms_number) {
                foundChild.mom = this._id;
            }
            if (this.phone === foundChild.dads_number) {
                foundChild.dad = this._id;
            }
            await foundChild.save();
        }
    }
});

const Member = mongoose.model('member', MemberSchema);

module.exports = Member;