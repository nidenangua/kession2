const examMixins = {
    data() {
        return {
            tkTypes: [
                {
                    id: '1',
                    name: '简答题'
                },
                {
                    id: '2',
                    name: '单选题'
                },
                {
                    id: '3',
                    name: '多选题'
                },
                {
                    id: '4',
                    name: '判断题'
                },
                {
                    id: '5',
                    name: '填空题'
                },
                {
                    id: '6',
                    name: '组合题'
                }
            ]
        }
    },
    methods: {
        /**
         * 根据题目类型id返回题目类型名称
         * @param {String,Number}  
         */
        getTkTypeName(typeId) {
            if (!typeId) {
                return
            }
            typeId = parseInt(typeId)
            let typeName;
            this.tkTypes.map(item => {
                if (item.id == typeId) {
                    typeName = item.name
                }
            })
            return typeName
        }
    }
}
export default examMixins